import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Component xử lý callback sau khi verify email thành công
 * Backend sẽ redirect về đây với accessToken và refreshToken trong URL params
 */
export default function EmailVerifySuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // Lưu tokens vào localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log(
        "✅ Email verified successfully! Tokens saved to localStorage"
      );

      // Redirect về home hoặc dashboard sau 2 giây
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // Reload để update authentication state
      }, 2000);
    } else {
      // Không có tokens, có lỗi xảy ra
      console.error("❌ No tokens found in URL");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [searchParams, navigate]);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {accessToken && refreshToken ? (
          <>
            <div style={styles.iconSuccess}>✓</div>
            <h1 style={styles.title}>Email Verified Successfully!</h1>
            <p style={styles.message}>
              Your account has been created and verified.
            </p>
            <p style={styles.redirect}>Redirecting to home page...</p>
          </>
        ) : (
          <>
            <div style={styles.iconError}>✗</div>
            <h1 style={styles.title}>Verification Failed</h1>
            <p style={styles.message}>
              Something went wrong. Please try again.
            </p>
            <p style={styles.redirect}>Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  iconSuccess: {
    fontSize: "64px",
    color: "#4CAF50",
    marginBottom: "20px",
  },
  iconError: {
    fontSize: "64px",
    color: "#f44336",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  message: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  redirect: {
    fontSize: "14px",
    color: "#999",
    fontStyle: "italic",
  },
};
