const express = require("express");
const {
  verifyTokenAuthentication,
} = require("../middlewares/authentication.js");
const {
  updateUserProfile,
  deleteUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.patch(
  "/updateProfile/:id",
  verifyTokenAuthentication,
  updateUserProfile
);
router.delete("/deleteUser/:id", verifyTokenAuthentication, deleteUser);

module.exports = router;
