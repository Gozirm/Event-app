import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: [true, "Email already in use"],
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please enter a valid password"],
      minlength: [8, "Minimum password length must be 8 characters"],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password mustn't contain password");
        }
      },
    },
    profileImage: {
      type: String,
      default: "https://api.multiavatar.com/.svg",
    },
    savedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// password comparison
userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};
userSchema.methods.generateToken = async function (params) {
  let token = jwt.sign(
    {
      userId: this._id,
      role: this.role,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.JWT_SECRETE,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 100);
  return resetToken;
};
const User = mongoose.model("User ", userSchema);
export default User;
