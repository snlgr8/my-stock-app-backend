const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');

const userRegistration = async (userDetails, role, res) => {
  try {
    const isUsernameAvailable = await validateUsername(userDetails.username);
    if (!isUsernameAvailable) {
      return res
        .status(404)
        .json({ message: 'Sorry, username is not available', success: false });
    }
    const isEmailAvailable = await validateEmail(userDetails.email);
    if (!isEmailAvailable) {
      return res.status(404).json({
        message: 'Sorry, email is already registered',
        success: false,
      });
    }
    const password = await bcrypt.hash(userDetails.password, 12);
    const newUser = new User({
      ...userDetails,
      password,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: 'User registration successful', success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const validateUsername = async (username) => {
  const user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? false : true;
};

const userLogin = async (userDetails, res) => {
  const { username, password, role } = userDetails;
  //Check if username is present
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(500).json({
        message: 'Username not found. Please register',
        success: false,
      });
    }
    //Check if email Id matches
    if (user.role !== role) {
      return res.status(500).json({
        message: 'You dont have permission to view this page',
        success: false,
      });
    }

    //Check for password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      //Generate JWT token
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          email: user.email,
          username: user.username,
        },
        SECRET,
        { expiresIn: '7 days' }
      );

      let result = {
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`,
        expiresIn: 168,
      };
      //Success userLogin
      return res
        .status(200)
        .json({ ...result, message: 'User login success', success: true });
    }

    return res.status(500).json({
      message: 'User login fail.Please check your credentials.',
      success: false,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
module.exports = {
  userRegistration,
  userLogin,
};
