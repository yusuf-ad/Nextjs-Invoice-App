import jwt from "jsonwebtoken";

export const createToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Construct cookie attributes in a structured manner
  const cookieAttributes = [
    `jwt=${token}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${1 * 24 * 60 * 60}`, // 1 day in seconds
    "SameSite=Strict",
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; "); // Filter out any empty strings and join

  return cookieAttributes;
};
