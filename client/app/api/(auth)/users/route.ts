import { connect } from "@/lib/database";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async function () {
  try {
    await connect();

    const users = await User.find();

    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     users,
    //   },
    // });
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
};

export const POST = async function (request: Request) {
  try {
    await connect();

    const body = await request.json();

    const newUser = await User.create({
      fullName: body.fullName,
      username: body.username,
      email: body.email,
      password: body.password,
    });

    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
};

// export const PUT = async function (request: Request) {
//   try {
//     await connect();

//     const body = await request.json();

//     const { username, email, fullName, photo } = body;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         username,
//         email,
//         fullName,
//         photo,
//       },
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!user) {
//       throw new Error("User can not be found!");
//     }
//   } catch (error) {}
// };
