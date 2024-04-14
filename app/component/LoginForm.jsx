import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (

    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="font-bold text-xl my-4">
                Enter your Gwent Details
            </h1>

            <form action="" className="flex flex-col gap-3">
                <input type="text" className="" placeholder="Your Gwent ID" required/>
                <input type="password" className="" placeholder="Password" required/>

                <button className="bg-green-500 text-white font-bold cursor-point px-6 py-2">
                    Login
                </button>

                <div className="bg-red-500 text-white w-full text-sm py-1 px-3 rounded-md mt-2 ">
                    Error Message
                </div>

                <Link className="text-sm mt-3 text-right" href={`/register`}>Don&apos;t have an account? <span className="font-bold">Register.</span></Link>
            </form>
        </div>
    </div>
  );
};

export default LoginForm;