const transporter = require("../config/nodemailer.js");

const sendServerMail = async (email, content) => {
  try {
    await transporter.sendMail({
      from: "abc@email.com",
      to: email,
      subject: "Activation Link",
      text: content,
    });
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending activation email:", error);
    throw new Error("Error sending activation email");
  }
};

module.exports = { sendServerMail };
