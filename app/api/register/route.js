import { NextResponse } from "next/server";

export async function POST(req){

    try{
        const {name, email, password} = await req.json();//will return a promise

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