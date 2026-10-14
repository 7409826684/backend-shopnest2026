const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: {type: String,required: true,trim: true},
    email: {type: String,required: true,unique: true,lowercase: true,trim: true},
    password: {type: String,required: true},
    role: {type: String,enum: ["user", "admin"],default: "user"},
    verified: {type: Boolean,default: false},
  },
  {
    timestamps: true,
  }
);
//  const User = mongoose.model("User", userSchema);

//  module.exports = User;
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;

