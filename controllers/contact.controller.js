const Contact = require("../model/contact.model.js");
const { sendServerMail } = require("../helpers/sendMail.js");
const { subscribeTemplate } = require("../utilities/subscribeTemplate.js");

const sendContactMail = async (req, res, next) => {
  try {
    const { recipients, subject, content, name } = req.body;
    await sendServerMail(recipients, subject, content);
    const newMail = new Contact({
      recipients,
      name,
      subject,
      content,
    });
    await newMail.save();
    res.status(200).json({ message: "Your mail sent successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const subscription = async (req, res, next) => {
  try {
    const { email } = req.body;
    const subject = "HAPPY TO SUBSCRIBE BULK MAILER";
    await sendServerMail(email, subject, subscribeTemplate());
    res.status(200).json({ message: "Thank you for subscribe!!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { sendContactMail, subscription };
