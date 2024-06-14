import { connectToDatabase } from "@/lib/auth/database";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { fullName, email, password, username } = await req.json();

    if (!fullName || !email || !password || !username) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please provide all the required fields!",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(
      {
        status: "success",
        data: {
          user: newUser,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 },
    );
  } finally {
    prisma.$disconnect();
  }
}

// export async function POST(request: Request) {
//   try {
//     await connect();

//     const body = await request.json();

//     console.log(body);

//     const newUser = await User.create({
//       fullName: body.fullName,
//       username: body.username,
//       email: body.email,
//       password: body.password,
//     });

//     newUser.password = undefined;
//     newUser.__v = undefined;

//     const response = new NextResponse(
//       JSON.stringify({
//         status: "success",
//         data: { user: newUser },
//       }),
//       { status: 201 },
//     );

//     //   createToken(res, newUser._id);
//     const tokenCookie = createToken(newUser._id.toString());

//     // Set the cookie in the response headers
//     response.headers.set("Set-Cookie", tokenCookie);

//     return response;
//   } catch (err: any) {
//     return new NextResponse(
//       JSON.stringify({
//         status: "error",
//         message: err.message,
//       }),
//       { status: 500 },
//     );
//   }
// }
