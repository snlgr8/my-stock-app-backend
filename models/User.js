const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Please provide password'],
      select: false,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email id',
      ],
      required: [true, 'Please provide email id'],
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.APP_SECRET,
    { expiresIn: process.env.EXPIRY }
  );
};

UserSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(35).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpiry = Date.now() + 10 * (60 * 1000);
  return resetToken;
};
module.exports = model('User', UserSchema);
