const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.route("/").get(authController.protect, userController.getAllUsers);

router
  .route("/profile")
  .get(authController.protect, userController.getUser)
  .put(authController.protect, userController.updateUser);

module.exports = router;
