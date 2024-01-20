const express = require("express");
const {
  verifyTokenAuthentication,
} = require("../middlewares/authentication.js");
const { sendBulkMail, deleteInboxMail, getMailsByUser, getMailById } = require("../controllers/mail.controller.js");
const joiValidation = require("../middlewares/joiValidation.js");
const {
  sendBulkMailSchema,
} = require("../validations/mailValidationSchema.js");
const { sendContactMail, subscription } = require("../controllers/contact.controller.js");

const router = express.Router();

router.post(
  "/sendBulkMail",
  verifyTokenAuthentication,
  joiValidation(sendBulkMailSchema),
  sendBulkMail
);

router.post(
  "/sendContactMail",
  sendContactMail
);

router.post(
  "/subscription",
  subscription
);

router.delete('/deleteInboxMail/:mailId',verifyTokenAuthentication,deleteInboxMail)
router.get('/getMailsByUser',verifyTokenAuthentication,getMailsByUser)
router.get('/getMailById/:mailId',verifyTokenAuthentication,getMailById)
module.exports = router;
