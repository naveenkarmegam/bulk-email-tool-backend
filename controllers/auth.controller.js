const bcryptjs = require("bcryptjs");

const User = require("../model/user.model.js");
const generateToken = require("../config/jwt.js");
const { firebaseApp } = require("../security/firebase.js");

const verifyToken = require("../helpers/verifyToken.js");
const setError = require("../helpers/customError.js");
const { sendServerMail } = require("../helpers/sendMail.js");

const userRegistration = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return next(setError(400, "Email already registered"));
    }

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    const user = new User(req.body);
    const savedUser = await user.save();
    const token = generateToken(savedUser._id);

    const bodyOfMail = `Click the following link to Activate your account: 
    http://localhost:3005/user/activate-account/${token}`;

    await sendServerMail(req.body.email, bodyOfMail);

    res.status(201).json({
      message:
        "Registration is successful. The activation link has been sent to your email.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const activateAccount = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decodedToken = await verifyToken(token);

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return next(setError(404, "User not found"));
    }
    if (user.isActivated) {
      return next(setError(400, "Account is already activated"));
    }
    user.isActivated = true;
    await user.save();
    res.status(200).json({
      message: "Account activated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const logInWithGoogle = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);
    if (decodedToken.email) {
      const user = await User.findOne({ firebaseId: decodedToken.uid });
      if (user) {
        const token = generateToken(user._id);
        return res.status(200).json({ token, user });
      } else {
        let newUser = new User({
          firstName: decodedToken.name,
          email: decodedToken.email,
          firebaseId: decodedToken.uid,
        });
        await newUser.save();
        const token = generateToken(newUser._id);
        return res.status(200).json({ token, newUser });
      }
    } else {
      return next(setError(404, "Sign in failed"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegistration,
  logInWithGoogle,
  activateAccount,
};
