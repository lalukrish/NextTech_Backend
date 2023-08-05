const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

mongoose.model("Users", userSchema);
