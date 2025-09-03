const mongoose = require("mongoose");

const freelancerDocsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doc_type: {
    type: String,
    enum: [
      "passport",
      "permit",
      "y_tunnus",
      "tax",
      "insurance",
      "yel",
      "other",
    ],
    required: true,
  },
  filename: { type: String, required: true },
  storage_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
  expires_at: { type: Date },
  verified_flag: { type: Boolean, default: false },
});

module.exports = mongoose.model("FreelancerDocs", freelancerDocsSchema);