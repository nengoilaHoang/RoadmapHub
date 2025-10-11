import AccountService from "../services/Account.service.js";
import ProfileService from "../services/Profile.service.js";
import RefreshTokenService from "../services/RefreshToken.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { SendEmail } from "../Helps/SendEmail.js";
import { jwtDecode } from "jwt-decode";
dotenv.config();
//const accountService = new AccountService(new AccountDAO());
class AccountController {
  login = async (req, res, next) => {
    // Removed check for req.authenticate - users can login multiple times (multi-device)
    const { email, passWord } = req.body;

    // Normal email/password login only
    // Google login sử dụng OAuth2.controller.js thay vì endpoint này
    if (!email || !passWord) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    const passWordInDB = await AccountService.getPassWord(email);
    const isMatch = await bcrypt.compare(passWord, passWordInDB);
    const account = await AccountService.login(
      email,
      isMatch ? passWordInDB : null
    );

    if (!account) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    } else {
      // Tạo payload cho token
      const payload = {
        id: account.id,
        userName: account.userName,
        email: account.email,
      };
      // Ký token (expiresIn = thời hạn, ví dụ 1h)
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h", // ⚠️ TEST ONLY - 1 giờ để test refresh token
      });
      let encodeToken = CryptoJS.AES.encrypt(
        token,
        process.env.CRYPTO_SECRET
      ).toString();

      // Tạo refresh token và lưu vào DB
      const deviceInfo = req.headers["user-agent"] || null;
      const ipAddress = req.ip || req.connection.remoteAddress || null;
      const refreshTokenResult = await RefreshTokenService.createRefreshToken(
        account.id,
        account.email, // Thêm email vào payload
        deviceInfo,
        ipAddress
      );

      const refreshToken = refreshTokenResult.success
        ? refreshTokenResult.refreshToken.token
        : null;
      let encodeRefreshToken = refreshToken
        ? CryptoJS.AES.encrypt(
            refreshToken,
            process.env.CRYPTO_SECRET
          ).toString()
        : null;

      //tạo và hashed mã pin
      const pin = Math.floor(100000 + Math.random() * 900000).toString();
      let hashedPin = await bcrypt.hash(
        pin,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      // gửi pin qua mail để verify login
      const text = `Hi! There, this is your pin code: ${pin}. Please use this pin to verify your login. The pin is valid for 10 minutes. If you did not request this, please ignore this email.`;
      SendEmail({ to: account.email, text: text });

      return res.status(200).json({
        status: true,
        message: "Login successful",
        account,
        hashedPin,
        encodeToken,
        encodeRefreshToken,
      });
    }
  };
  loginVerify = async (req, res, next) => {
    const { hashedPin, encodeToken, encodeRefreshToken, pin } = req.body;
    // Verify the hashedPin
    let validPin = await bcrypt.compare(pin, hashedPin);
    // If valid, log the user in
    //console.log("Valid pin:", validPin);
    if (validPin) {
      // Create a new session or token for the user
      const decodedToken = CryptoJS.AES.decrypt(
        encodeToken,
        process.env.CRYPTO_SECRET
      ).toString(CryptoJS.enc.Utf8);
      const decodeRefreshToken = encodeRefreshToken
        ? CryptoJS.AES.decrypt(
            encodeRefreshToken,
            process.env.CRYPTO_SECRET
          ).toString(CryptoJS.enc.Utf8)
        : null;

      return res.status(200).json({
        status: true,
        message: "Login successful",
        accessToken: decodedToken,
        refreshToken: decodeRefreshToken,
      });
    } else {
      return res.status(401).json({ status: false, message: "Invalid pin" });
    }
    // If invalid, return an error response
  };
  refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res
        .status(400)
        .json({ status: false, message: "Refresh token is required" });
    }

    try {
      // Verify refresh token từ database
      const verifyResult = await RefreshTokenService.verifyRefreshToken(
        refreshToken
      );

      if (!verifyResult.success) {
        return res
          .status(401)
          .json({ status: false, message: verifyResult.message });
      }

      const payload = verifyResult.payload;

      console.log("Payload from refresh token:", payload);

      // Lấy thông tin account
      const account = await AccountService.getAccountByEmail(
        payload.email || null
      );
      if (!account) {
        return res
          .status(404)
          .json({ status: false, message: "Account not found" });
      }

      // Tạo access token mới
      const newPayload = {
        id: account.id,
        userName: account.userName || account.username,
        email: account.email,
      };
      const newAccessToken = jwt.sign(newPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        status: true,
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      return res
        .status(401)
        .json({ status: false, message: "Invalid refresh token" });
    }
  };
  checkLogin = async (req, res, next) => {
    // req.authenticate always exists because requireAuth middleware
    const profile = await ProfileService.getProfileByAccountId(
      req.authenticate.id
    );
    return res.status(200).json({
      status: true,
      message: "User is logged in",
      user: req.authenticate,
      profile,
    });
  };
  logout = async (req, res, next) => {
    try {
      // Lấy accountId từ middleware requireAuth
      const { id: accountId } = req.authenticate;

      // Revoke tất cả refresh tokens của user này
      const revokedCount = await RefreshTokenService.revokeAllRefreshTokens(
        accountId
      );
      console.log(
        `Logout: Revoked ${revokedCount} refresh token(s) for account ${accountId}`
      );

      // Clear cookie (nếu còn dùng cookie)
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      return res.status(200).json({
        status: true,
        message: "Logout successful",
        revokedTokens: revokedCount,
      });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({
        status: false,
        message: "Logout failed",
        error: error.message,
      });
    }
  };
  forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    // Check if the email exists
    try {
      const account = await AccountService.getAccountByEmail(email);
      console.log("Account found:", account);
      if (!account) {
        return res
          .status(404)
          .json({ status: false, message: "Email not found" });
      }
      // Generate a reset token
      const resetToken = jwt.sign(
        { email: account.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      // Send the reset link via email
      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}/${email}`;
      const html = `
                <h1>Password Reset</h1>
                <p>Hi ${account.fullname},</p>
                <p>Please click the link below to reset your password:</p>
                <a href="${resetLink}">Reset Password</a>
                <p>This link will expire in 1 hour.</p>
            `;
      const success = SendEmail({ to: email, html: html });
      if (success) {
        return res.status(200).json({
          status: true,
          message: "Password reset email sent successfully",
        });
      } else {
        return res
          .status(500)
          .json({ status: false, message: "Failed to send email" });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  resetPassword = async (req, res, next) => {
    const { token, email } = req.params;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.email !== email) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid token" });
      }
      const account = await AccountService.getAccountByEmail(email);

      // Change password first
      await AccountService.changePassword(email, req.body.password);

      // Tạo payload cho token
      const payload = {
        id: account.id,
        userName: account.userName,
        email: account.email,
      };

      // Tạo access token mới
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Tạo refresh token và lưu vào DB
      const deviceInfo = req.headers["user-agent"] || null;
      const ipAddress = req.ip || req.connection.remoteAddress || null;
      const refreshTokenResult = await RefreshTokenService.createRefreshToken(
        account.id,
        account.email,
        deviceInfo,
        ipAddress
      );

      const refreshToken = refreshTokenResult.success
        ? refreshTokenResult.refreshToken.token
        : null;

      return res.status(200).json({
        status: true,
        message: "Password reset successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      console.error("Error verifying password reset:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  verifyEmail = async (req, res, nex) => {
    const { email, password, fullname } = req.body;
    const resultCheckAccountEmail = await AccountService.checkExitAccountEmail(
      email
    );
    const resultCheckAccountUsername =
      await AccountService.checkExitAccountUsername(fullname);
    if (resultCheckAccountEmail.success && resultCheckAccountUsername.success) {
      const token = jwt.sign(
        {
          email,
          fullname,
          password,
        },
        process.env.JWT_SECRET || "ourSecretKey",
        { expiresIn: "10m" }
      );
      const html = `
                    <h1>Email Verification</h1>
                    <p>Hi! You have recently registered on our website.</p>
                    <p>Please click the link below to verify your email:</p>
                    <a href="${process.env.BACKEND_URL}/api/accounts/verify/${token}">Verify Email</a>
                    <p>This link will expire in 10 minutes.</p>
                `;
      const success = SendEmail({ to: email, html: html });
      ////console.log("Send email success:", success);
      if (success)
        return res.json({ success: true, message: "Email Sent Successfully" });
      else return res.json({ success: false, message: "Failed to send email" });
    } else {
      let errors = {};
      if (!resultCheckAccountEmail.success)
        errors.email = resultCheckAccountEmail.message;
      if (!resultCheckAccountUsername.success)
        errors.username = resultCheckAccountUsername.message;

      return res.json({
        success: false,
        errors: errors,
      });
    }
  };
  verify = async (req, res, next) => {
    const { token } = req.params;
    // Verifying the JWT token
    jwt.verify(
      token,
      process.env.JWT_SECRET || "ourSecretKey",
      async function (err, decoded) {
        if (err) {
          ////console.log(err);
          res.send(
            "Email verification failed, possibly the link is invalid or expired"
          );
          // return {
          //     success:false,
          //     status: 1, //Email verification failed, possibly the link is invalid or expired
          //     message:'Email verification failed, possibly the link is invalid or expired'
          // }
        } else {
          const { email, password, fullname } = decoded;
          await AccountService.createAccount(email, fullname, password);
          //tạo profile cho account với fullname là username
          const newaccount = await AccountService.getAccountByEmail(
            email,
            fullname
          );
          await ProfileService.createProfile(newaccount.id, fullname);

          // Tạo payload cho access token
          const payload = {
            id: newaccount.id,
            fullname: newaccount.fullname,
            email: newaccount.email,
          };

          // Tạo access token
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          // Tạo refresh token và lưu vào DB
          const deviceInfo = req.headers["user-agent"] || null;
          const ipAddress = req.ip || req.connection.remoteAddress || null;
          const refreshTokenResult =
            await RefreshTokenService.createRefreshToken(
              newaccount.id,
              newaccount.email,
              deviceInfo,
              ipAddress
            );

          const refreshToken = refreshTokenResult.success
            ? refreshTokenResult.refreshToken.token
            : null;

          // Redirect với tokens trong URL (để frontend lấy và lưu vào localStorage)
          const redirectUrl = `${
            process.env.FRONTEND_URL
          }/auth/verify-success?accessToken=${encodeURIComponent(
            accessToken
          )}&refreshToken=${encodeURIComponent(refreshToken)}`;
          res.redirect(redirectUrl);
        }
      }
    );
  };
  signUpGoogle = async (req, res) => {
    const { credential } = req.body;
    ////console.log(credential);
    const decode = jwtDecode(credential);
    const email = decode.email;
    const username = decode.name;
    const password = decode.sub;
    ////console.log(decode, email, username, password);
    const resultCheckAccountEmail = await AccountService.checkExitAccountEmail(
      email
    );
    if (resultCheckAccountEmail.success) {
      ////console.log('Google password:',password);
      await AccountService.createAccount(email, username, password);
      //tạo profile cho account với fullname là username
      ////console.log("run to here: ",email,username,password);
      const newaccount = await AccountService.getAccountByEmail(email);
      ////console.log("New account created via Google:", newaccount);
      await ProfileService.createProfile(newaccount.id, username);
      //
      const passWordInDB = await AccountService.getPassWord(email);
      const isMatch = await bcrypt.compare(password, passWordInDB);
      const account = await AccountService.login(
        email,
        isMatch ? passWordInDB : null
      );
      ////console.log("Account created via Google:", account);
      const payload = {
        id: account.id,
        userName: account.username,
        email: account.email,
      };
      // Ký token (expiresIn = thời hạn, ví dụ 1h)
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });
      ////console.log("this is token in signupGG: ",token);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      res.json({
        success: true,
        message: "Sign up with google successfully",
        // token: token
      });
      // res.redirect('http://localhost:3000/')
    } else {
      res.json({
        success: false,
        message: "Sign up with google unsuccessfully",
      });
      // res.redirect('http://localhost:3000/login/')
    }
  };
  changePassword = async (req, res, next) => {
    // req.authenticate exists from requireAuth middleware
    const { oldPassword, newPassword } = req.body;
    ////console.log("Change password request received", req.authenticate, oldPassword, newPassword, typeof newPassword);
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: false,
        message: "Old password and new password are required",
      });
    }
    // Check if the old password is correct
    const account = await AccountService.getAccountByEmail(
      req.authenticate.email
    );
    ////console.log("Account retrieved:", account);
    const isMatch = await bcrypt.compare(oldPassword, account.passWord);
    ////console.log("Old password match:", isMatch);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Old password is incorrect" });
    }
    //Update the password
    await AccountService.changePassword(req.authenticate.email, newPassword);
    return res
      .status(200)
      .json({ status: true, message: "Password changed successfully" });
  };
  changeEmail = async (req, res, next) => {
    // req.authenticate exists from requireAuth middleware
    const { oldEmail, newEmail } = req.body;
    ////console.log("oldEmail:", oldEmail, "newEmail: ", newEmail);
    if (!newEmail && !oldEmail) {
      return res
        .status(400)
        .json({ status: false, message: "New email is required" });
    }

    // Check if new email already exists
    const resultCheckAccountEmail = await AccountService.checkExitAccountEmail(
      newEmail
    );
    if (!resultCheckAccountEmail.success) {
      return res
        .status(400)
        .json({ status: false, message: resultCheckAccountEmail.message });
    }

    // gửi pin cho email cũ
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    // bỏ hashlink vào url và gửi tới email mới. Ở link này sẽ cần nhập mã pin để verify việc đổi email
    const pinToken = jwt.sign({ pin }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    const verifyText = `here is your pin ${pin} to change email`;
    const verifyHtml = `<p>here is your link to change email <a href="${process.env.FRONTEND_URL}/change-email/verify/${pinToken}/${oldEmail}/${newEmail}">click here</a></p>
            <p>please open this link in the browser where you are logged in</p>`;

    // Send emails and check success
    const successOld = SendEmail({ to: oldEmail, text: verifyText });
    const successNew = SendEmail({ to: newEmail, html: verifyHtml });

    if (!successOld || !successNew) {
      return res
        .status(500)
        .json({ status: false, message: "Failed to send verification email" });
    }

    return res.status(200).json({
      status: true,
      message: "Verification email sent. Please check your email to confirm.",
    });
  };
  changeEmailVerify = async (req, res, next) => {
    const { hashedPin, oldEmail, newEmail } = req.params;
    const { pin } = req.body;
    ////console.log("hashedPin:", hashedPin, "pin: ", pin);
    try {
      const decoded = jwt.verify(hashedPin, process.env.JWT_SECRET);
      if (!decoded) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid or expired token" });
      }
      // Check if the pin is correct
      if (pin !== decoded.pin) {
        return res.status(400).json({ status: false, message: "Invalid pin" });
      }
      // Update the email
      await AccountService.changeEmail(oldEmail, newEmail);

      // Get account info with new email
      const account = await AccountService.getAccountByEmail(newEmail);
      if (!account) {
        return res
          .status(404)
          .json({ status: false, message: "Account not found" });
      }

      // Create new access token with updated email
      const payload = {
        id: account.id,
        userName: account.userName,
        email: account.email, // New email
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Create new refresh token
      const refreshToken = jwt.sign(
        { id: account.id, email: account.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Save refresh token to database
      await RefreshTokenService.createRefreshToken(
        account.id,
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      );

      return res.status(200).json({
        status: true,
        message: "Email changed successfully",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.error("Error verifying email change:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  deleteAccount = async (req, res, next) => {
    // req.authenticate exists from requireAuth middleware
    const payload = {
      id: req.authenticate.id,
      email: req.authenticate.email,
    };
    //console.log("Payload:", payload);
    const verifyToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    const toEmail = req.authenticate.email;
    const html = `<p>here is your link to delete account <a href="${process.env.FRONTEND_URL}/delete-account/verify/${verifyToken}/${toEmail}">click here</a></p>`;
    SendEmail({ to: toEmail, html: html });
    return res.status(200).json({
      status: true,
      message: "Verification email sent successfully",
    });
  };
  deleteAccountVerify = async (req, res, next) => {
    const { verifyToken, email } = req.body;
    //console.log("verifyToken:", verifyToken, "email: ", email);
    try {
      const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET);
      //console.log("Decoded JWT:", decoded);
      if (decoded.email !== email) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid token" });
      }
      const account = await AccountService.getAccountByEmail(email);
      if (!account) {
        return res
          .status(404)
          .json({ status: false, message: "Account not found" });
      }
      const userId = account.id;
      await ProfileService.deleteProfileByAccountId(userId);
      await AccountService.deleteAccount(userId);
      res.clearCookie("token");
      return res
        .status(200)
        .json({ status: true, message: "Account deleted successfully" });
    } catch (error) {
      console.error("Error verifying account deletion:", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
}
export default new AccountController(AccountService);
