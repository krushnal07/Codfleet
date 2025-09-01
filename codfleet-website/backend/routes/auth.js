const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user (initiate, sends verification email)
// @access  Public
router.post('/register', [
  body('email').isEmail().trim().withMessage('Invalid email'),
  body('password').isLength({ min: 10 }).withMessage('Password must be at least 10 characters'),
  body('role').isIn(['freelancer', 'company']).withMessage('Role must be freelancer or company')
], authController.register);

// @route   GET /api/auth/verify/:token
// @desc    Verify email
// @access  Public
router.get('/verify/:token', authController.verifyEmail);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getMe);

module.exports = router;