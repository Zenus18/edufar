"use client";
import AuthController from "@/controller/auth_controller";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function RegisterForm() {
  const route = useRouter();
  const [postData, setpostData] = useState({
    username: "",
    password: "",
  });
  const [TypePassword, setTypePassword] = useState(true);
  const [IconPassword, SetIconPassword] = useState(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  function handlepassword() {
    if (TypePassword) {
      SetIconPassword(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    } else {
      SetIconPassword(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      );
    }
    setTypePassword(!TypePassword);
  }

  const onChangeHandler = (e) => {
    const newdata = { ...postData };
    newdata[e.target.id] = e.target.value;
    setpostData(newdata);
  };
  return (
    <div className="form-control w-full text-black ">
      <label className="label">
        <span className="label-text">Username</span>
      </label>
      <input
        type="text"
        placeholder="Username"
        id="username"
        onChange={(e) => onChangeHandler(e)}
        className="input input-bordered w-full focus:outline-none rounded-md border-gray-300 focus:border-gray-300 bg-white"
      />
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <div className="join">
        <input
          className="input input-bordered w-full focus:outline-none rounded-l-md border-gray-300 focus:border-gray-300 bg-white"
          type={TypePassword ? "password" : "text"}
          id="password"
          onChange={(e) => onChangeHandler(e)}
          placeholder="Password"
        />
        <button className="btn join-item btn-info" onClick={handlepassword}>
          {IconPassword}
        </button>
      </div>
      <div className="w-28 self-center mt-8">
        <button
          className="btn bg-info text-lime-50 hover:bg-info w-full rounded-md h-min max-h-min min-h-10"
          onClick={() => {
            AuthController.login(postData);
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
