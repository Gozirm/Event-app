import { sendForgotPasswordMail } from "../emails/emailHandler.js";
import User from "../modals/signUpModal.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fetchRandomAvatar = async () => {
  const avatarStyles = ["Circle"];

  const maleTopTypes = [
    "NoHair",
    "ShortHairDreads01",
    "ShortHairDreads02",
    "ShortHairFrizzle",
    "ShortHairShaggy",
    "LongHairBigHair",
    "LongHairBun",
    "LongHairStraight",
    "LongHairStraight2",
  ];

  const femaleTopTypes = [
    "LongHairBigHair",
    "LongHairBun",
    "LongHairStraight",
    "LongHairCurly",
    "LongHairStraight01",
    "LongHairStraight02",
  ];
  const accessoriesTypes = [
    "Round",
    "Wayfarers",
    "Sunglasses",
    "Blank",
    "Hipster",
    "Prescription",
    "Goggles",
  ];
  const clotheTypes = [
    "BlazerShirt",
    "Blazer",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "Shirt",
    "ShirtScoopNeck",
    "ShirtVNeck",
  ];
  const eyeTypes = ["Default", "Happy", "Surprised", "Wink", "Hearts", "Side"];
  const eyebrowTypes = ["Default", "Angry", "Sad", "Flat", "Raised", "Unibrow"];
  const mouthTypes = ["Default", "Smile", "Eating", "Serious", "Tongue"];
  const skinColors = ["Light", "Brown", "DarkBrown", "Black", "Pale", "Yellow"];
  const isFemale = Math.random() < 0.5;

  const topTypes = isFemale ? femaleTopTypes : maleTopTypes;

  const avatarUrl = `https://avataaars.io/?avatarStyle=${getRandomElement(
    avatarStyles
  )}&topType=${getRandomElement(topTypes)}&accessoriesType=${getRandomElement(
    accessoriesTypes
  )}&clotheType=${getRandomElement(clotheTypes)}&eyeType=${getRandomElement(
    eyeTypes
  )}&eyebrowType=${getRandomElement(eyebrowTypes)}&mouthType=${getRandomElement(
    mouthTypes
  )}&skinColor=${getRandomElement(skinColors)}`;

  return avatarUrl;
};

const generateProfileImage = async () => {
  const avatarUrl = await fetchRandomAvatar();

  const result = await cloudinary.v2.uploader.upload(avatarUrl, {
    use_filename: true,
    folder: "mubby-events",
  });

  return result.secure_url;
};

export const createUser = async (req, res) => {
  const { email, fullname, password, confirmPassword, role } = req.body;

  try {
    if (!email || !fullname || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        errMsg: "All fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        errMsg: "Password and Confirm password must match",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, errMsg: "Email already exists" });
    }

    const profileImageUrl = await generateProfileImage();

    const userRole = role === "admin" ? "admin" : "member";
    const newUser = new User({
      email,
      fullname,
      password,
      role: userRole,
      profileImage: profileImageUrl,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User  Created Successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      errMsg: "All fields are required to sign in...",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errMsg: "User  not found" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Email or Password is Incorrect" });
    }

    // Generate token
    const token = await user.generateToken();
    if (token) {
      return res.status(200).json({
        success: true,
        message: "Logged in",
        user: {
          role: user.role,
          email: user.email,
          fullname: user.fullname,
          profileImage: user.profileImage,
          token,
          _id: user._id,
        },
      });
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return res
      .status(500)
      .json({ success: false, errMsg: "Internal Server Error" });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ success: false, errMsg: "Input field cannot be empty" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errMsg: "Email not found" });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Prepare the reset URL
    const resetUrl = process.env.CLIENT_URL_RESET + resetToken;

    // Send the email
    try {
      await sendForgotPasswordMail({
        to: user.email,
        fullname: user.fullname,
        resetUrl,
      });

      // Send success response after email is sent
      return res.status(201).json({
        success: true,
        message: "Mail sent",
      });
    } catch (error) {
      // If email sending fails, clear the token fields and save the user
      user.getResetPasswordToken = undefined;
      user.getResetPasswordExpire = undefined;
      await user.save();

      // Send error response for email sending failure
      return res.status(500).json({
        success: false,
        errMsg: "Email couldn't be sent",
        errMsg: error.message,
      });
    }
  } catch (error) {
    // Handle any other errors
    return res.status(500).json({ success: false, errMsg: error.message });
  }
};
export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "invalid Reset Token" });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Password Reset Successfull" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const verify = async (req, res) => {
  return res.status(201).json({
    success: true,
    message: "Here is the user details",
    user: req.user,
  });
};
