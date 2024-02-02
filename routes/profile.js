const express = require("express");
const router = express.Router();
const Multer = require("multer");
const { auth, isDoctor } = require("../middleware/auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledAppointments,
  DoctorDashboard,
} = require("../controllers/profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: User-related endpoints
 * /user/deleteAccount:
 *   delete:
 *     summary: Delete user account
 *     description: Endpoint to delete the user account and associated data.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User account deleted successfully
 *       '404':
 *         description: Not Found - User not found
 *       '500':
 *         description: Internal Server Error - Error deleting the user account
 */
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledAppointments);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isDoctor, DoctorDashboard);

module.exports = router;
