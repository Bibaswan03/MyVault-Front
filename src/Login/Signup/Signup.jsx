// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import OtpModal from "./OtpModal";
const Signup = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const handlelogin = async () => {
   
    const { data } = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    });
    
    if (data.success) {
      window.localStorage.setItem("token", data.token);
      toast.success(data.message);
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } else toast.error(data.message);
    setemail("");
    setpassword("");
  };

  const handlesignup = async () => {
    const { data } = await axios.post(`${apiUrl}/signup`, {
      name,
      email,
      password,
    });
    
    if (data.success) {
      const { response } = await axios.post(
        `${apiUrl}/addDummyRoutine`,
        { email }
      );
      toast.success(data.message);
      setIsLogin(true);
    } else toast.error(data.message);
    setemail("");
    setpassword("");
    setname("");
  };
  const sendotp = async () => {

    if (isLogin) {
      const user = await axios.post(`${apiUrl}/checkuser`, {
        email,
      });
      if (user.data.success) {
        toast('Sending OTP!', {
          icon: '📧',
        });
        const { data } = await axios.post(`${apiUrl}/sendOtp`, {
          email,
        });
        
        if (data.success) {
          toast.success("OTP sent. Check your inbox");
          setIsOtpOpen(true);
        } else {
          toast.error("Failed to send otp");
        }
      } else {
        toast.error(
          "User not found or there might have been an error. Check your username and try again ."
        );
      }
    } else {
      toast('Sending OTP! Please wait.', {
        icon: '👏',
      });
      const { data } = await axios.post(`${apiUrl}/sendOtp`, {
        email,
      });
      
      if (data.success) {
        toast.success("OTP sent. Check your inbox");
        setIsOtpOpen(true);
      } else {
        toast.error(data.message);
      }
    }
  };

  const verifyOtp = async () => {
    // Add OTP verification logic here
    const { data } = await axios.post(`${apiUrl}/verifyOtp`, {
      email,
      otp: parseInt(otp),
    });
    
    if (data.success) {
      toast.success("OTP Verified");
      if (isLogin) handlelogin();
      else handlesignup();
      setIsOtpOpen(false);
    } else {
      toast.error("Invalid OTP. Check again and enter.");
    }
    setOtp("");
  };

  const toggleForms = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex -mt-10 items-center justify-center bg-transparent">
      <Toaster />
      <div className="bg-neutral-900 transition-all duration-1000 border-[0.5px]  text-white p-8 rounded-lg  w-80">
        <h2 className="text-2xl text-center  mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form>
          {!isLogin && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                className="w-full p-2 px-4 rounded-full bg-transparent border-2"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              className="w-full p-2  px-4 rounded-full bg-transparent border-2"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="w-full p-2 px-4 rounded-full bg-transparent border-2"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                //isLogin ? sendotpforlogin(e) : sendotpforsignup(e);
                sendotp(e);
              }}
              className="w-1/2  p-2 bg-white rounded-full hover:scale-95 text-black transition duration-200"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <button
              onClick={toggleForms}
              className="mt-4 w-1/2 p-2 bg-gray-800 rounded-full hover:scale-95 transition text-white duration-200"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
      <OtpModal
        isOpen={isOtpOpen}
        onRequestClose={() => setIsOtpOpen(false)}
        otp={otp}
        setOtp={setOtp}
        verifyOtp={verifyOtp}
        resendOtp={sendotp}
      />
    </div>
  );
};

export default Signup;
