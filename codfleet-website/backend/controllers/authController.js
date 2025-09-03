// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Nodemailer setup (configure your email provider)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user (but don't save to the database yet)
    user = new User({
      name,
      email,
      password_hash,
      role,
      verificationToken,
      isVerified: false // Add a flag to indicate if the user is verified
    });
    console.log("Verification Token being sent:", verificationToken);
    await user.save(); //Save to datbase before sending email

    // Construct the verification URL
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;

    // Send the verification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account',
      html: `<p>Please click the following link to verify your account: <a href="${verificationUrl}">${verificationUrl}</a></p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification email sent' }); // Use 200 OK
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token
    await user.save();


    // Redirect the user to the freelancer profile page (adjust URL as needed)
    res.redirect(`http://localhost:5173/login`); // Redirect to frontend profile page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Login route called');  // Log that the route was called

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array()); // Log validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Received email and password:', email, password);  // Log received data

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found with email:', email); // Log if user not found
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user); // Log the user object

    //Check if user is verified
    if(!user.isVerified){
        console.log('User is not verified');
        return res.status(400).json({ message: 'Please verify your email to continue' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password matched!'); // Log if password matches

    // Generate token
     token = generateToken(user._id); // removed const to avoid redeclaration
    console.log('Generated token:', token); // Log generated token

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, //Add user role
        status: user.status
      }
    });
    console.log('Login successful, response sent'); // Log before sending response

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password_hash');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};