const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const passport = require("passport");
const sendEmail = require("../utils/sendEmail");
const userRegistration = async (req, res, next) => {
  try {
    const { username, name, email, password, role } = req.body;
    const user = await User.create({ username, name, password, email, role });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 404));
  }
  try {
    const user = await User.findOne({ email }).select("password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    //Check for password
    let isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(
        new ErrorResponse("User login fail.Please check your credentials.", 404)
      );
    }
    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.generatePasswordResetToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>Reset Password</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, message: "Email sent" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiry = undefined;

      await user.save();
      return next(new ErrorResponse("Email could not be send", 400));
    }
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.generateToken();
  return res.status(statusCode).json({ success: true, token });
};

const userAuth = passport.authenticate("jwt", { session: false });
module.exports = {
  userAuth,
  userRegistration,
  userLogin,
  forgotPassword,
};
