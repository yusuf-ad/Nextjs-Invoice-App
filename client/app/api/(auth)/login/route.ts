import { connect } from "@/lib/database";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Return the set-cookie header
  return `jwt=${token}; HttpOnly; Path=/; Max-Age=${1 * 24 * 60 * 60}; SameSite=Strict; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;
};

export async function POST(request: Request) {
  try {
    await connect();

    const body = await request.json();

    const { username, password } = body;

    // 1. Check if username and password exist
    if (!username || !password) {
      throw new Error(`Please provide your username and password!`);
    }

    const user = await User.findOne({ username });

    // 2. Check if user exist & password is correct
    if (!user) {
      throw new Error("User not be found or you entered a wrong username!");
    }

    if (!(await user.correctPassword(password, user.password))) {
      throw new Error("You entered wrong password!");
    }

    // 3. Send token to client
    // createToken(res, user._id);

    // Generate token and set it in cookie
    const tokenCookie = createToken(user._id.toString());

    user.password = undefined;
    user.__v = undefined;

    // Create a NextResponse object and set the cookie header
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user },
      }),
      { status: 201 },
    );

    // Set the cookie in the response headers
    response.headers.set("Set-Cookie", tokenCookie);

    return response;
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
}
