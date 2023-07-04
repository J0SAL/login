import { connect } from "@/dbConfig/dbConfig";
import getIdFromCookie from "@/helpers/getIdFromCookie";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromCookie(request);
    const user = await User.findOne({ _id: id }).select(
      "-password -isVerified -isAdmin -forgotPassword -forgotPasswordExpiry -verifyToken -verifyExpiry"
    );
    return NextResponse.json(
      {
        message: "User profile",
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}
