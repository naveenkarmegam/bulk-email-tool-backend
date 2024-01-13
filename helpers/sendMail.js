const transporter = require("../config/nodemailer.js");

const sendServerMail = async (email,subject, content) => {
  try {
    await transporter.sendMail({
      from: "abc@email.com",
      to: email,
      subject,
      text: content,
    });
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email. Sorry for, the inconvenience please try again after sometimes");
  }
};

module.exports = { sendServerMail };
