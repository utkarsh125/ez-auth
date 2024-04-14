"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("User Exists.");

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!name || !email || !password){
        setError("All fields are necessary.");
        return;
    }

    try{

      const resUserExists = await fetch(("api/userExists"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if(user){
        setError("User already exists");
        return;
      }


        const res = await fetch('api/register', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });

        if(res.ok) {
            const form = e.target;
            form.reset();
        }else{
            console.log("User registration failed.");
        }
    }catch(error){
        console.log("Error during Registration: ", error);
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="font-bold text-xl my-4">
          Get started by filling in your details
        </h1>

        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-3">
          <input onChange={(e) => setName(e.target.value)} type="text" className="" placeholder="User Name" />
          <input onChange={(e) => setEmail(e.target.value)} type="text" className="" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" className="" placeholder="Password" />

          <button className="bg-green-500 text-white font-bold cursor-point px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-full text-sm py-1 px-3 rounded-md mt-2 ">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={`/login`}>
            Have an account? <span className="font-bold">Login.</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
