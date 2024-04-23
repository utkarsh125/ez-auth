import { Link, useNavigate } from "react-router-dom";
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault(); //this is going to prevent refreshing the page on submit
    //Making request to the backend.
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); //To convert to JSON
      setLoading(false); //When the user is Signed up, stop showing loading animation
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/');
      // setError(false); //after we get SUCCESS then show no error
    } catch (error) {
      //Otherwise
      setLoading(false); //Stop loading
      setError(true); //SHOW ERROR
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          required
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 shadow-lg"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 shadow-lg">
          Sign Up with Google
        </button>

        <div className="flex gap-2 mt-5">
          <p>Don&apos;t have an account?</p>
          <Link to={`/sign-up`}>
            <span className="text-blue-600">Sign up.</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>

      </form>
    </div>
  );
}
