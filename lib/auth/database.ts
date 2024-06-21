// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// export const connect = async () => {
//   const connectionState = mongoose.connection.readyState;

//   if (connectionState === 1) {
//     console.log("Already connected to the database");
//     return;
//   }

//   if (connectionState === 2) {
//     console.log("Already connecting to the database");
//     return;
//   }

//   try {
//     mongoose.connect(MONGODB_URI!).then(() => {
//       console.log("App connected to Database");
//     });
//   } catch (error) {
//     console.log("Error", error);

//     throw new Error("Error connecting to the database");
//   }
// };
import prisma from "@/prisma";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log("ERR!", error);

    throw new Error("Error connecting to the database");
  }
};
