const mongoose = require("mongoose");

const eventsLogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event_type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String },
});

module.exports = mongoose.model("EventsLog", eventsLogSchema);

