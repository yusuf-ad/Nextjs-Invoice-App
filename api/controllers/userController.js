const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const createToken = require("../utils/createToken");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select("-password -__v")
    .populate("invoices");

  if (!user) {
    return next(new AppError("User can not be found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { username, email, fullName, photo } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      username,
      email,
      fullName,
      photo,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError("User can not be found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  createToken(res, newUser._id);

  newUser.password = undefined;
  newUser.__v = undefined;

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  console.log("denemeser", req.body);

  const { username, password } = req.body;

  // 1. Check if username and password exist
  if (!username || !password) {
    return next(
      new AppError(`Please provide your username and password!`, 400)
    );
  }

  const user = await User.findOne({ username });

  // 2. Check if user exist & password is correct
  if (!user) {
    return next(
      new AppError("User not be found or you entered a wrong username!", 404)
    );
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("You entered wrong password!", 401));
  }

  // 3. Send token to client
  createToken(res, user._id);

  user.password = undefined;
  user.__v = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "You are logged out!",
  });
});
