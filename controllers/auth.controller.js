const bcryptjs = require("bcryptjs");

//model
const User = require("../model/user.model.js");
//config
const generateToken = require("../config/generateToken.js");

//security
const { firebaseApp } = require("../security/firebase.js");

//helpers
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

    const activateUrl = `http://localhost:3005/api/auth/activate-account/${token}`;
    const emailBody = `Click the following link to activate your account:\n${activateUrl}`;

    await sendServerMail(req.body.email, emailBody);

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

    const user = await User.findById(decodedToken._id);
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

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(setError(401, "Invalid credentials"));
    }
    if (!user.isActivated) {
      return next(
        setError(400, "Please activate your account before logging in.")
      );
    }
    const passwordValid = await bcryptjs.compare(password, user.password);
    if (!passwordValid) {
      return next(setError(401, "Invalid credentials"));
    }
    const token = generateToken(user._id);
    const { password: hashPassword, ...rest } = user._doc;
    // await User.findOneAndUpdate({ email }, { token });
    const expiryDate = new Date(Date.now() + 3600000); // 1hour, added in the cookie obj
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const logInWithGoogle = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log(token)
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
      return next(
        setError(404, "Sign-in failed. Unable to retrieve email from Google.")
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegistration,
  logInWithGoogle,
  activateAccount,
  userLogin,
};
