import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid token or token expired",
        },
        {
          status: 400,
        }
      );
    }
    if (user.isVerified) {
      return NextResponse.json(
        {
          message: "Email already verified",
        },
        {
          status: 400,
        }
      );
    }

    user.isVerified = true;
    await user.save();
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
