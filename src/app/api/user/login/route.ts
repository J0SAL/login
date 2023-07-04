import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, email } = reqBody;

    if (!password || !email) {
      return NextResponse.json(
        { message: "Please enter all fields!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found!" },
        { status: 404 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
        return NextResponse.json(
            { message: "Invalid credentials!" },
            { status: 401 }
        );
    }

    return NextResponse.json(
      { message: "User Fetched!", success: true, user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
