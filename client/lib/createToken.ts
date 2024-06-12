import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  const token = jwt.sign(
    // payload
    { userId },
    // secret
    process.env.JWT_SECRET,
    // options
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  // set JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
  });
};

module.exports = createToken;
