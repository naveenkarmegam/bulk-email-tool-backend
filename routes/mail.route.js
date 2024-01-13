const express = require('express');
const { verifyTokenAuthentication } = require('../middlewares/authentication.js');
const { sendBulkMail } = require('../controllers/mail.controller.js');
const joiValidation = require('../middlewares/joiValidation.js');
const { sendBulkMailSchema } = require('../validations/mailValidationSchema.js');

const router = express.Router()


router.post('/sendBulkMail',verifyTokenAuthentication,joiValidation(sendBulkMailSchema),sendBulkMail)

module.exports = router