const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Employe } = require("./Employe");

const UserSchema = new mongoose.Schema({
  hash: String,
  salt: String,
  role: {
    type: Number,
    required: [true, "must provide role"],
  },
});

module.exports = Employe.discriminator("User", UserSchema);
