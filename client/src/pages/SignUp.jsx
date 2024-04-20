import { Link } from "react-router-dom";
import React from "react";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

      <form action="" className="flex flex-col gap-4">
        <input
          required
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          required
          type="email"
          placeholder="Email"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          required
          type="password"
          placeholder="Password"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 shadow-lg">
          Sign Up
        </button>

        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 shadow-lg">
          Sign Up with Google
        </button>

        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={`/sign-in`}>
          <span className="text-blue-600">Sign in.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
