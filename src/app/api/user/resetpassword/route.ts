import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {token, password} = reqBody

        const user = await User.findOne({forgotPassword: token, forgotPasswordExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({message: "Invalid token"}, {status: 400})
        }
        // check if password is same as old password
        const samePassword = await bcryptjs.compare(password, user.password);
        if (samePassword){
            return NextResponse.json({message: "New password cannot be the same as old password"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user.password = hashPassword
        user.forgotPassword = undefined
        user.forgotPasswordExpiry = undefined
        
        await user.save()
        return NextResponse.json({message: "Password reset successfully!"}, {status: 200})
    }catch(err: any){
        return NextResponse.json({ message: err.message}, {status: 500})
    }
}