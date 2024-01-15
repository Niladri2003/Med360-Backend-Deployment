// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword")

const { auth } = require("../middleware/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Endpoint to log in a user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/login", login)

// Route for user signup

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     description: Endpoint to sign up a user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               accountType:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/signup", signup)

// Route for sending OTP to the user's email

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /auth/sendotp:
 *   post:
 *     summary: Send Otp to Email
 *     description: Endpoint to send OTP to USEr's email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/sendotp", sendotp)

// Route for Changing the password

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /auth/changePassword:
 *   post:
 *     summary: Change user password
 *     description: Endpoint to change the password for a user.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '401':
 *         description: Unauthorized - Incorrect old password
 *       '500':
 *         description: Internal Server Error - Error updating password or sending email
 */
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /auth/resetPasswordToken:
 *   post:
 *     summary: Generate password reset token
 *     description: Endpoint to generate a password reset token and send an email with a reset link to the user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reset token generated and email sent successfully
 *       '404':
 *         description: User not found - Email not registered with the application
 *       '500':
 *         description: Internal Server Error - Error generating reset token or sending email
 */
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 * /auth/resetPassword:
 *   post:
 *     summary: Reset user password
 *     description: Endpoint to reset the user's password using a valid reset token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '400':
 *         description: Bad Request - Password and Confirm Password do not match
 *       '404':
 *         description: Not Found - Invalid or expired reset token
 *       '500':
 *         description: Internal Server Error - Error updating the password
 */
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router
