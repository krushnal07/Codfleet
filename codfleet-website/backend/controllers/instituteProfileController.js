const InstituteProfile = require('../models/InstituteProfile');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Register Institute (Step 1)
const registerInstitute = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const userId = req.user.id;

        // Check if profile already exists
        const existingProfile = await InstituteProfile.findOne({ user: userId });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: 'Profile already exists for this user' });
        }

        const {
            instituteName,
            businessID,
            accreditationType,
            primaryContact,
            emailAddress,
            phoneNumber,
            websiteURL,
        } = req.body;

        const instituteProfile = new InstituteProfile({
            user: userId,
            instituteName,
            businessID,
            accreditationType,
            primaryContact,
            emailAddress,
            phoneNumber,
            websiteURL,
        });

        await instituteProfile.save();
    await User.findByIdAndUpdate(req.user.id, { hasCompletedOnboarding: true });
        res.status(201).json({ success: true, message: 'Institute profile registered successfully', profile: instituteProfile });
    } catch (error) {
        console.error('Error registering institute:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update Institute (Subsequent steps)
const updateInstitute = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            instituteName,
            businessID,
            accreditationType,
            primaryContact,
            emailAddress,
            phoneNumber,
            websiteURL,
        } = req.body;
        const updatedProfile = await InstituteProfile.findOneAndUpdate(
            { user: userId },
            {
                instituteName,
                businessID,
                accreditationType,
                primaryContact,
                emailAddress,
                phoneNumber,
                websiteURL,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: 'Institute profile not found' });
        }

        res.json({ success: true, message: 'Institute profile updated successfully', profile: updatedProfile });
    } catch (error) {
        console.error('Error updating institute profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// GET /api/institute-profile
const getInstituteProfile = async (req, res) => {
    try {
        console.log("getInstituteProfile called");  // **ADD THIS**
        console.log("req.user:", req.user);  // **ADD THIS: VERY IMPORTANT!**
        const userId = req.user.id;
        console.log("userId:", userId);  // **ADD THIS**
        const profile = await InstituteProfile.findOne({ user: userId });

        console.log("profile:", profile);  // **ADD THIS**

        if (!profile) {
            console.log("No profile found");  // **ADD THIS**
            return res.status(200).json({ success: true, profile: null, message: 'No profile found for this user.' });
        }

        res.status(200).json({ success: true, profile: profile });
    } catch (error) {
        console.error('Error fetching institute profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { registerInstitute, updateInstitute , getInstituteProfile};