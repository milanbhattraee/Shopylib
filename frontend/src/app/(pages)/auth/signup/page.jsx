"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignupForm = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("password");

  const handleToggle = () => {
    setShow(!show);
    setType(!show ? "text" : "password");
  };

  const handleGoogleSignup = () => {
    console.log("Signup with Google");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white relative rounded-2xl shadow-xl p-8 w-[500px]">
        <IoMdClose className="absolute right-8 top-8 text-3xl text-blue-600 cursor-pointer transform transition-transform duration-300 hover:rotate-90" />

        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Sign Up
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-3 w-full h-10">
              <input
                className="peer w-full h-full bg-transparent text-cyan-gray-700 font-sans font-normal focus:outline-0 disabled:bg-cyan-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-cyan-gray-200 placeholder-shown:border-t-cyan-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-cyan-gray-200 focus:border-cyan-500"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-cyan-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-cyan-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-cyan-gray-400 peer-focus:text-cyan-500 before:border-cyan-gray-200 peer-focus:before:!border-cyan-500 after:border-cyan-gray-200 peer-focus:after:!border-cyan-500">
                Full Name
              </label>
            </div>
            <div className="relative mb-3 w-full h-10">
              <input
                className="peer w-full h-full bg-transparent text-cyan-gray-700 font-sans font-normal focus:outline-0 disabled:bg-cyan-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-cyan-gray-200 placeholder-shown:border-t-cyan-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-cyan-gray-200 focus:border-cyan-500"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-cyan-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-cyan-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-cyan-gray-400 peer-focus:text-cyan-500 before:border-cyan-gray-200 peer-focus:before:!border-cyan-500 after:border-cyan-gray-200 peer-focus:after:!border-cyan-500">
                Phone
              </label>
            </div>
            <div className="relative mb-3 w-full h-10">
              <input
                type={type}
                className=" peer w-full h-full bg-transparent text-cyan-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-cyan-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-cyan-gray-200 placeholder-shown:border-t-cyan-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-cyan-gray-200 focus:border-cyan-500"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-cyan-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-cyan-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-cyan-gray-400 peer-focus:text-cyan-500 before:border-cyan-gray-200 peer-focus:before:!border-cyan-500 after:border-cyan-gray-200 peer-focus:after:!border-cyan-500">
                Password
              </label>
              {!show ? (
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <IoEye
                    className="absolute right-1 cursor-pointer top-2"
                    size={25}
                  />
                </span>
              ) : (
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <IoEyeOff
                    className="absolute right-1 cursor-pointer top-2"
                    size={25}
                  />
                </span>
              )}
            </div>
            <div className="relative mb-3 w-full h-10">
              <input
                type={type}
                className=" peer w-full h-full bg-transparent text-cyan-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-cyan-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-cyan-gray-200 placeholder-shown:border-t-cyan-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-cyan-gray-200 focus:border-cyan-500"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-cyan-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-cyan-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-cyan-gray-400 peer-focus:text-cyan-500 before:border-cyan-gray-200 peer-focus:before:!border-cyan-500 after:border-cyan-gray-200 peer-focus:after:!border-cyan-500">
                Confirm Password
              </label>
              {!show ? (
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                ></span>
              ) : (
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                ></span>
              )}
            </div>
          </div>
          <div className="relative mb-3 w-full h-10">
            <input
              className="peer w-full h-full bg-transparent text-cyan-gray-700 font-sans font-normal focus:outline-0 disabled:bg-cyan-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-cyan-gray-200 placeholder-shown:border-t-cyan-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-cyan-gray-200 focus:border-cyan-500"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-cyan-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-cyan-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-cyan-gray-400 peer-focus:text-cyan-500 before:border-cyan-gray-200 peer-focus:before:!border-cyan-500 after:border-cyan-gray-200 peer-focus:after:!border-cyan-500">
              Email Address
            </label>
          </div>
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>

          <div className="w-full flex justify-center flex-col gap-y-4 items-center ">
            <button
              class="cursor-pointer w-full transition-all bg-blue-500 h-12 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Sign Up
            </button>
            <button
              class="cursor-pointer w-full h-12 flex justify-center items-center transition-all text-blue-600 bg-gray-200  px-6 py-2 rounded-lg
border-gray-400
border-b-[4px] hover:brightness-100 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-60 active:translate-y-[2px]"
            >
              <FcGoogle className="mr-3" size={24} />
              Sign Up with Google
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <a href="#" className="text-sm font-bold text-blue-500 hover:underline">
              Already have an account? Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
