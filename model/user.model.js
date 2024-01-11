const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    firebaseId: String,
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});
module.exports = model("User", UserSchema);
