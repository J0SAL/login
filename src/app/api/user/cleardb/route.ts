import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function GET(req: NextRequest, res: NextResponse) {
    try{
        await User.deleteMany({})
        return NextResponse.redirect(new URL("/login", req.url))
    }
    catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}