const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    index: true,
  },
  photo: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg",
  },
  username: {
    type: String,
    required: [true, "Please provide your username!"],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password!"],
    // TODO it wont show up on any output
    // select: false,
  },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
  ],
});

// ! DOCUMENT MIDDLEWARE: runs before .save() and .create()
userSchema.pre("save", async function (next) {
  try {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

// ! INSTANCE METHOD
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
