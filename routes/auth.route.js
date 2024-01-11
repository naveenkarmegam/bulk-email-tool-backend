const express = require("express");

//middlewares
const joiValidation = require("../config/joiValidaiton.js");
const {
  registerValidationSchema,
} = require("../middlewares/userValidationSchema.js");

//controller
const { userRegistration, logInWithGoogle, activateAccount } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/login-with-google", logInWithGoogle);
  
router.post("/register", joiValidation(registerValidationSchema),userRegistration);
router.get('/activate-account/:token',activateAccount)

module.exports = router;
