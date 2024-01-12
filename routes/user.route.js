const express = require('express');
const { verifyTokenAuthentication } = require('../middlewares/authentication.js');
const { updateUserProfile } = require('../controllers/user.controller.js');




const router = express.Router();


router.patch('/updateProfile/:id',verifyTokenAuthentication,updateUserProfile)

module.exports = router