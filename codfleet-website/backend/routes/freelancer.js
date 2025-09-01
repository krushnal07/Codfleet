const express = require('express');
const { body } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const freelancerController = require('../controllers/freelancerController');

const router = express.Router();

// @route   POST /api/freelancer/profile
// @desc    Create/Update freelancer profile
// @access  Private (Freelancer only)
router.post('/profile', [
  auth,
  authorize('freelancer'),
  body('name').notEmpty().withMessage('Name is required'),
  body('dob').isISO8601().withMessage('Valid date of birth is required'),
  body('citizenship').notEmpty().withMessage('Citizenship is required'),
  body('in_finland_since').matches(/^\d{2}\/\d{4}$/).withMessage('Format should be MM/YYYY'),
  body('visa_type').notEmpty().withMessage('Visa type is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('city').notEmpty().withMessage('City is required')
], freelancerController.createOrUpdateProfile);

// @route   GET /api/freelancer/profile
// @desc    Get freelancer profile
// @access  Private (Freelancer only)
router.get('/profile', [auth, authorize('freelancer')], freelancerController.getProfile);

// @route   POST /api/freelancer/documents
// @desc    Upload freelancer documents
// @access  Private (Freelancer only)
router.post('/documents', [
  auth,
  authorize('freelancer'),
  upload.single('document')
], freelancerController.uploadDocument);

// @route   GET /api/freelancer/documents
// @desc    Get freelancer documents
// @access  Private (Freelancer only)
router.get('/documents', [auth, authorize('freelancer')], freelancerController.getDocuments);

module.exports = router;