"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (value === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    } else {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP entered: ", otp.join(""));

    // Reset OTP values
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white relative rounded-2xl shadow-xl p-8 w-[500px]">
        <IoMdClose className="absolute right-8 top-8 text-3xl text-blue-600 cursor-pointer transform transition-transform duration-300 hover:rotate-90" />

        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Enter OTP
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={value}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>

          <div className="w-full flex justify-center flex-col gap-y-4 items-center">
            <button
              type="submit"
              className="cursor-pointer w-full transition-all bg-blue-500 h-12 text-white px-6 py-2 rounded-lg
              border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Submit OTP
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <a href="#" className="text-sm font-bold text-blue-500 hover:underline">
              Didn't receive OTP? Resend
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
