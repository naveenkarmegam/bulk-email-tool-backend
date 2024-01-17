const Mail = require('../model/mail.model.js')
const { sendServerMail } = require("../helpers/sendMail.js");

const sendBulkMail = async(req,res,next)=>{
try {
    const {recipients,subject,content} = req.body
        await sendServerMail(recipients.join(','),subject,content)
        const newMail = new Mail({
          recipients: recipients,
          userId: req.user._id, 
          subject,
          content,
        });
        await newMail.save();
      res.status(200).json({ message: 'Bulk email sent successfully' });
    
} catch (error) {
    next(error);
}
}

module.exports = {sendBulkMail};
