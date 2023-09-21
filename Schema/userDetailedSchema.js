const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  user_skills: [
    {
      type: String, // Each element in the array is a string representing a skill
    },
  ],
  education: [
    {
      primary: {
        type: String,
      },
    },
  ],
  dob: {
    type: string,
  },
});

const UserDetails = mongoose.model("UserDetails", userInfoSchema);

module.exports = UserDetails;
