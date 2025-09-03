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
       email: req.body.email,
       name: req.body.name,              // Use req.body directly
       dob: req.body.dob,                // Use req.body directly
       citizenship: req.body.citizenship,  // Use req.body directly
       in_finland_since: req.body.inFinlandSince, // Use req.body directly
       visa_type: req.body.visaType,          // Use req.body directly
       visa_valid_till: req.body.visaValidTill, // Use req.body directly
       y_tunnus: req.body.businessId,          // Use req.body directly, map to the correct field
       tax_id: req.body.taxId,               // Use req.body directly
       phone: req.body.phone,              // Use req.body directly
       // Add other fields as needed
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
     res.status(500).json({ message: 'Server error creating/updating profile' });
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
        console.log('Upload document route called');
        console.log('req.file:', req.file);
        console.log('req.body:', req.body); // Important to log req.body

        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        //doc_type MUST come from your frontend when you upload the file
        const { doc_type } = req.body;  //doc_type MUST be sent with file upload req
        if (!doc_type) {
            return res.status(400).json({ message: 'Document type is required in req.body' });
        }

        const document = new FreelancerDocs({
            user_id: req.user.id,
            doc_type: doc_type,
            filename: req.file.originalname,
            storage_url: req.file.path
        });

        await document.save();

        res.json({
            success: true,
            document: document
        });
    } catch (error) {
        console.error('Error in uploadDocument:', error);
        res.status(500).json({ message: 'Server error uploading document' });
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

 exports.getFreelancerProfile = async (req, res) => {
     try {
         const userId = req.user.id;

         const profile = await FreelancerProfile.findOne({ user_id: userId });

         if (!profile) {
             return res.status(200).json({ success: true, profile: null, message: 'No freelancer profile found for this user.' });
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

 exports.updateFreelancerProfile = async (req, res) => {
     try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }

         const userId = req.user.id;
         const { name, dob, citizenship, phone, inFinlandSince, visaType, visaValidTill, businessId, taxId, city } = req.body;

         const profileData = {
             name,
             dob,
             citizenship,
             in_finland_since: inFinlandSince,
             visa_type: visaType,
             visa_valid_till: visaValidTill,
             y_tunnus: businessId,
             tax_id: taxId,
             phone,
             city,
         };

         const updatedProfile = await FreelancerProfile.findOneAndUpdate({ user_id: userId }, profileData, { new: true, runValidators: true });

         if (!updatedProfile) {
             return res.status(404).json({ success: false, message: 'Freelancer profile not found.' });
         }

         res.json({ success: true, message: 'Freelancer profile updated successfully', profile: updatedProfile });
     } catch (error) {
         console.error('Error updating freelancer profile:', error);
         res.status(500).json({ message: 'Server error' });
     }
 };
// backend/controllers/freelancerController.js (Example)
