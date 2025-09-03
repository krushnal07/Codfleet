const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const freelancerController = require('../controllers/freelancerController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
  '/profile',
  auth,
  authorize('freelancer'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('dob').isISO8601().withMessage('Valid date of birth is required'),
    body('citizenship').notEmpty().withMessage('Citizenship is required'),
    body('in_finland_since').matches(/^\d{2}\/\d{4}$/).withMessage('Format should be MM/YYYY'),
    body('visa_type').notEmpty().withMessage('Visa type is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('city').notEmpty().withMessage('City is required')
  ],
  freelancerController.createOrUpdateProfile
);

router.post(
  '/documents',
  auth,
  authorize('freelancer'),
  upload('freelancer-documents').single('document'), // dynamic folder
  freelancerController.uploadDocument
);

module.exports = router;