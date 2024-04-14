import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req){

    try{
        const {name, email, password} = await req.json();//will return a promise

        //HASHED PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        console.log("Username: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);

        return NextResponse.json({msg: "User Registered" }, { status: 201 });
    }catch(error){
        return NextResponse.json(
            {msg: "An error occurred while registering the user."},
            {status: 500},
        )
    }
}