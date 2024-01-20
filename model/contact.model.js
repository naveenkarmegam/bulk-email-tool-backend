const { Schema, model } = require("mongoose");
const contactSchema = new Schema(
  {
    recipients: {
      type:String,
      required: true,
    },
    name: {
        type:String,
        required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contact", contactSchema);
