import { createToken } from "@/lib/createToken";
import { connect } from "@/lib/database";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connect();

    const body = await request.json();

    console.log(body);

    const newUser = await User.create({
      fullName: body.fullName,
      username: body.username,
      email: body.email,
      password: body.password,
    });

    newUser.password = undefined;
    newUser.__v = undefined;

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: newUser },
      }),
      { status: 201 },
    );

    //   createToken(res, newUser._id);
    const tokenCookie = createToken(newUser._id.toString());

    // Set the cookie in the response headers
    response.headers.set("Set-Cookie", tokenCookie);

    return response;
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: err.message,
      }),
      { status: 500 },
    );
  }
}
