const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const freelancerController = require('../controllers/freelancerController');
const upload = require('../middleware/upload');

const router = express.Router();

 router.get('/profile', auth, authorize('freelancer'), freelancerController.getFreelancerProfile);
 router.put(
     '/profile/update',
     auth,
     authorize('freelancer'),
     [
         body('name').notEmpty().withMessage('Name is required'),
         body('dob').isISO8601().withMessage('Valid date of birth is required'),
         body('citizenship').notEmpty().withMessage('Citizenship is required'),
         body('inFinlandSince').notEmpty().withMessage('In Finland Since is required'), // Changed
         body('visaType').notEmpty().withMessage('Visa type is required'),           // Changed
         body('phone').notEmpty().withMessage('Phone is required'),
         body('city').notEmpty().withMessage('City is required')
     ],
     freelancerController.updateFreelancerProfile
 );

 // Route for uploading FreelancerDocs
 router.post(
   '/documents',
   auth,
   authorize('freelancer'),
   upload('freelancer-documents').single('document'), // Expects a single file named 'document'
   freelancerController.uploadDocument
 );
module.exports = router;