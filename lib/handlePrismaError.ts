import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const handlePrismaError = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = error.meta?.target;

      let message = "A user with this value already exists.";
      if (typeof target === "string") {
        message = `A user with this ${target.split("_").at(1)} already exists.`;
      } else if (Array.isArray(target)) {
        message = `A user with this ${target.join(", ")} already exists.`;
      }
      return {
        status: "error",
        message,
      };
    }
  }
};
