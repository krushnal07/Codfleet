# CodFleet Website - MERN Stack Implementation

This is a complete MERN (MongoDB, Express.js, React, Node.js) stack implementation of the CodFleet website based on the provided requirements document.

## Project Structure

```
codfleet-website/
├── backend/                 # Node.js/Express API server
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication and upload middleware
│   ├── models/            # MongoDB/Mongoose models
│   ├── routes/            # API route handlers
│   ├── uploads/           # File upload directory
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── frontend/
    └── codfleet-frontend/  # React application
        ├── src/
        │   ├── components/ # Reusable React components
        │   ├── pages/     # Page components
        │   └── App.jsx    # Main App component
        ├── package.json   # Frontend dependencies
        └── index.html     # HTML entry point
```

## Features Implemented

### Backend API (Node.js/Express)
- **Authentication System**: JWT-based authentication with registration, login, and password reset
- **User Management**: Role-based access control (freelancer/company)
- **Profile Management**: Separate profile forms for freelancers and companies
- **Document Upload**: File upload system for freelancer documents
- **Fleet Statistics**: API endpoints for fleet strength counters
- **Contact Form**: Email-based contact form submission
- **Security**: CORS, rate limiting, helmet security headers
- **Database**: MongoDB integration with Mongoose ODM

### Frontend (React)
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Modern UI**: Professional design with shadcn/ui components
- **Navigation**: Multi-page routing with React Router
- **Animations**: Smooth animations with Framer Motion
- **Fleet Counter**: Animated counter component
- **Component Library**: Reusable components (Navbar, Footer, Cards)

### Pages Implemented
1. **Home Page**: Hero section, value propositions, fleet counter, how it works, blog preview
2. **The CodFleet Story**: Company story, mission, timeline, statistics
3. **Network/Join**: Registration paths for freelancers and companies
4. **Placeholder Pages**: Fleet Strength, Blog, Contact, Legal (ready for implementation)

### Database Models
- **Users**: Authentication and role management
- **FreelancerProfile**: Comprehensive freelancer information
- **FreelancerDocs**: Document management system
- **CompanyProfile**: Company information and requirements
- **EventsLog**: User activity tracking

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or pnpm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/codfleet
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development
   ```

4. Start MongoDB service:
   ```bash
   sudo systemctl start mongod
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/codfleet-frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev --host
   ```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Freelancer
- `POST /api/freelancer/profile` - Create/update freelancer profile
- `GET /api/freelancer/profile` - Get freelancer profile
- `POST /api/freelancer/documents` - Upload documents
- `GET /api/freelancer/documents` - Get uploaded documents

### Company
- `POST /api/company/profile` - Create/update company profile
- `GET /api/company/profile` - Get company profile

### General
- `POST /api/contact` - Submit contact form
- `GET /api/stats/fleet` - Get fleet statistics
- `GET /api/health` - Health check

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Nodemailer**: Email sending
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Axios**: HTTP client

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Security headers with Helmet
- Input validation
- File upload restrictions

## GDPR Compliance Features
- Explicit consent checkboxes
- Data retention policies
- User data export capabilities (stub)
- Privacy policy framework

## Deployment Notes
- Backend configured to listen on 0.0.0.0 for external access
- CORS configured for cross-origin requests
- Environment-based configuration
- Production-ready error handling
- File upload directory structure

## Future Enhancements
Based on the requirements document, the following features are planned for future phases:
- Email verification system
- Advanced KYC workflow
- Task posting and matching
- Payment integration
- Admin dashboard
- Real-time notifications
- Advanced reporting

## License
This project is proprietary to CodFleet Oy.

