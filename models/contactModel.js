const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  State: { type: String, required: true },
  District: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Contact", contactSchema);
