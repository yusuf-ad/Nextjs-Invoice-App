import prisma from "@/prisma";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log("ERR!", error);

    throw new Error("Error connecting to the database");
  }
};
