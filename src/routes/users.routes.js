const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  updateTripFormStatus,
} = require("../controllers/users.controller");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getProfile);
router.get("/", authenticate, authorize("admin"), getAllUsers);
router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  updateTripFormStatus
);

module.exports = router;
