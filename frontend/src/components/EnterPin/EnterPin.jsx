import React from "react";
import { useState, useRef } from "react";

export default function EnterPin(pin, setPin, onClickFunction){
    const inputRefs = useRef([]);
    const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // chỉ cho nhập số
    if (!value) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // focus sang ô tiếp theo
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // chặn hành vi mặc định

      const newPin = [...pin];

      if (pin[index]) {
        // nếu ô hiện tại có số thì xoá nó
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        // nếu ô hiện tại rỗng thì quay lại ô trước
        newPin[index - 1] = "";
        setPin(newPin);
        inputRefs.current[index - 1].focus();
      }
    }
  };
    return (
    <div className="verify-container">
      <h2>Xác thực đăng nhập</h2>
      <div className="pin-inputs">
        {pin.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      <button className="verify-btn" onClick={onClickFunction}>
        Xác thực
      </button>
    </div>
  );
}