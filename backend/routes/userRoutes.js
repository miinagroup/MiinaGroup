const express = require("express");
const router = express.Router();
const {
  verifyIsLoggedIn,
  verifyIsAdmin
} = require("../middleware/verifyAuthToken");
const {
  getUsers,
  registerUser,
  loginUser,
  verifyEmail,
  updateUserProfile,
  updateUserPassword,
  getUserProfile,
  getStoreUser,
  getUsersList,
  getUser,
  updateUser,
  deleteUser,
  formatUserName,
  forgotPassword,
  validateResetLink,
  resetPassword
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/:id/verify/:token/", verifyEmail);
router.get("/:id/resetPassword/:token/", validateResetLink);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

// user logged in routes:
router.use(verifyIsLoggedIn);
router.put("/profile", updateUserProfile);
router.put("/password", updateUserPassword);
router.get("/profile/:id", getUserProfile);
router.get("/store/:email", getStoreUser);
router.get("/list/:company", getUsersList)

// admin routes:
router.use(verifyIsAdmin);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/formatUserName", formatUserName);

module.exports = router;
