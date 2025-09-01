const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required'),
  body('consent').isBoolean().custom(value => {
    if (!value) {
      throw new Error('Consent is required');
    }
    return true;
  })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, company, message } = req.body;

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: 'New Contact Form Submission - CodFleet',
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Auto-response email
    const autoResponse = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting CodFleet',
      html: `
        <h3>Thank you for your message!</h3>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>The CodFleet Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoResponse);

    res.json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;

