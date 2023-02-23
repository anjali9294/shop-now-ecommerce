const express = require("express");

const {
  registerUser,
  loginUser,
  LogOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const {
  isAuthenticatedUser,

  authorzeRoles,
} = require("../middleware/authentication");

const router = express.Router();

// user registration
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(LogOutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorzeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorzeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorzeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorzeRoles("admin"), deleteUser);

module.exports = router;
