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

    const subject = "Activation Link";
    const activateUrl = `https://bulk-email-tool-681r.onrender.com/api/auth/activate-account/${token}`;
    const emailBody = `Click the following link to activate your account:\n${activateUrl}`;

    await sendServerMail(req.body.email, subject, emailBody);

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
    if (user.email_verified) {
      return next(setError(400, "Account is already activated"));
    }
    user.email_verified = true;
    await user.save();
    res.status(200).json({
      message: "Account activated successfully",
    });
  } catch (error) {
    console.error(error);
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
    if (!user.email_verified) {
      return next(
        setError(400, "Please activate your account before logging in.")
      );
    }
    const passwordValid = await bcryptjs.compare(password, user.password);
    if (!passwordValid) {
      return next(setError(401, "Invalid credentials"));
    }
    const token = generateToken(user._id);
    user.token = token;
    await user.save();
    const { password: hashPassword, ...rest } = user._doc;

    // const expiryDate = new Date(Date.now() + 3600000); // 1hour, added in the cookie obj
    res
      // .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const logInWithGoogle = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decodedToken = await firebaseApp.auth().verifyIdToken(token);
    if (decodedToken.email) {
      const user = await User.findOne({ email: decodedToken.email });
      if (user) {
        const token = generateToken(user._id);
        user.token = token;
        await user.save();
        const { password: hashPassword1, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        return res
          // .cookie("access_token", token, {
          //   httpOnly: true,
          //   expires: expiryDate,
          // })
          .status(200)
          .json(rest);
      } else {
        const generatePassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

        const newUser = new User({
          firstName: decodedToken.name,
          email: decodedToken.email,
          password: hashedPassword,
          profilePicture: decodedToken.picture,
          email_verified: decodedToken.email_verified,
        });
        await newUser.save();
        const token = generateToken(newUser._id);
        user.token = token;
        await user.save();
        const { password: hashPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        return res
          // .cookie("access_token", token, {
          //   httpOnly: true,
          //   expires: expiryDate,
          // })
          .status(200)
          .json(rest);
      }
    } else {
      return next(
        setError(404, "Sign-in failed. Unable to retrieve email from Google.")
      );
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({
      message: "Your Account Logout successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(setError(404, "User not found"));
    }

    const resetToken = generateToken(user._id);
    // user.resetPasswordToken = resetToken;
    // await user.save();

    const resetUrl = `https://naveen-bulk-mail-tool-fsd.netlify.app/reset-password/${resetToken}`;
    const content = `Click the following link to reset your password: ${resetUrl}`;
    await sendServerMail(email, "Reset Password Link", content);

    res.status(200).json({
      message: "Reset password link has been sent to your email.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const decodedToken = await verifyToken(token);

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(setError(400, "Invalid Token"));
    }
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    // user.resetPasswordToken = undefined;
    // await user.save();
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  userRegistration,
  logInWithGoogle,
  activateAccount,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
};
