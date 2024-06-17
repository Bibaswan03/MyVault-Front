// src/components/OtpModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

Modal.setAppElement('#root'); // Prevent screen readers from reading the background content

const OtpModal = ({ isOpen, onRequestClose, otp, setOtp, verifyOtp, resendOtp }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center h-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative bg-[#4d4d4d] p-8 rounded-lg shadow-lg max-w-sm w-full text-white">
        <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-200">
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-gray-300 mb-6 text-center">Please enter the OTP sent to your email</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-6 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2  bg-white text-black"
        />
        <button
          onClick={verifyOtp}
          className="w-1/2 flex mx-auto text-center px-8 bg-[#727171] text-white p-3 hover:scale-95 rounded-lg  transition duration-200"
        >
          Verify OTP
        </button>
        <h1
          onClick={resendOtp}
          className="w-full mt-1 underline text-center text-white p-3  transition duration-200"
        >
          Resend OTP
        </h1>
      </div>
    </Modal>
  );
};

export default OtpModal;
