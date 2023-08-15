const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
  },
  qualification_area: {
    type: String,
    required: true,
  },
});

const Roles = mongoose.model("Roles", roleSchema);
module.exports = Roles;
