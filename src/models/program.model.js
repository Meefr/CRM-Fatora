const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "3 Day Makkah Madinah"
  description: { type: String }, // Optional description
  active: { type: Boolean, default: false }, // To mark if this program is chosen
});

const Program = mongoose.model("Program", ProgramSchema);

module.exports = { Program ,ProgramSchema };
