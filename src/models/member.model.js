const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  member: {
    type: String,
    required: true,
    enum: ["Active", "Affiliate"],
  },
  room: String,
  bed: String,
  seatNo: String,
  busNo: String,
  type: { type: String, enum: ["Family", "Single"] },
  name: String,
  residenceNumber: String,
  nationality: String,
});

const Member = mongoose.model("Member", MemberSchema);

module.exports = { Member, MemberSchema };
