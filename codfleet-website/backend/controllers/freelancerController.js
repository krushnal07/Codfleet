// controllers/freelancerController.js
const { validationResult } = require('express-validator');
const FreelancerProfile = require('../models/FreelancerProfile');
const FreelancerDocs = require('../models/FreelancerDocs');

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const profileData = {
      user_id: req.user.id,
      ...req.body
    };

    let profile = await FreelancerProfile.findOne({ user_id: req.user.id });
    
    if (profile) {
      // Update existing profile
      profile = await FreelancerProfile.findOneAndUpdate(
        { user_id: req.user.id },
        profileData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      profile = new FreelancerProfile(profileData);
      await profile.save();
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOne({ user_id: req.user.id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    console.log('Upload document route called'); // Add this line

    if (!req.file) {
      console.log('No file uploaded');  // Check if req.file is undefined
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { doc_type } = req.body;

    if (!doc_type) {
      console.log('Document type is required'); // Check if doc_type is missing
      return res.status(400).json({ message: 'Document type is required' });
    }

    const document = new FreelancerDocs({
      user_id: req.user.id,
      doc_type,
      filename: req.file.originalname,
      storage_url: req.file.path
    });

    await document.save();

    res.json({
      success: true,
      document
    });
  } catch (error) {
    console.error('Error in uploadDocument:', error);  // Log the error!
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await FreelancerDocs.find({ user_id: req.user.id });
    
    res.json({
      success: true,
      documents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};