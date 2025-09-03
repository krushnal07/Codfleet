const mongoose = require("mongoose");

const freelancerProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String },
  dob: { type: Date },
  citizenship: { type: String },
  in_finland_since: { type: String }, // MM/YYYY
  visa_type: { type: String },
  visa_valid_till: { type: Date },
  y_tunnus: { type: String },
  tax_id: { type: String },
  insurance_status: { type: String },
  yel_status: { type: String },
  phone: { type: String },
  city: { type: String },
  languages: [{ type: String }],
  categories: [{ type: String }],
  availability: [{ type: String }],
  notes: { type: String },
  kyc_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  last_reviewed_at: { type: Date },
});

module.exports = mongoose.model("FreelancerProfile", freelancerProfileSchema);