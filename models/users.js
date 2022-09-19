const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  password: { type: String, minlength: 8, maxlength: 255, required: true },
  isAdmin: Boolean,
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("users", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  };

  return Joi.validate(user, schema);
}

function validateUserPassword(password) {
  Joi.validate(password, new PasswordComplexity(), (err) => {
    if (err)
      throw new Error(
        "Password must contain uppercase,lowercase,symbol,numbers"
      );
  });
}
exports.User = User;
exports.validate = validateUser;
exports.validatePassowrd = validateUserPassword;
