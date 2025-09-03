// backend/models/InstituteProfile.js
const mongoose = require('mongoose');

const InstituteProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    instituteName: { type: String, required: true },
    businessID: { type: String },
    accreditationType: { type: String },
    primaryContact: { type: String },
    emailAddress: { type: String },
    phoneNumber: { type: String },
    websiteURL: { type: String },
    // Course and Compliance details will be added here in a later iteration
    // Agreement and Integration details will be added here in a later iteration
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('InstituteProfile', InstituteProfileSchema);