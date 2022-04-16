import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../config/config";
/**
 * Retrives the user from the database and creates a JWT token to handle the session
 **/
const signIn = (req, res) => {
  try {
    let user = User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!user.authenticate(req.body.password))
      return res.status(401).json({ error: "Email and Password don't match" });
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    //The token is handlend in the cookie
    res.cookie("t", token, { expire: new Date() + 999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({
      error: "Could not sign in",
    });
  }
};

/**
 * Removes the user's token from the cookies
 */

const signOut = (req, res) => {
  res.clearCookie("t");
  return res.staus(200).json({
    message: "Signed out",
  });
};

const requireSignIn = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuth = (req, res, next) => {
  const auth = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!auth) return res.status(403).json({ error: "User not authorized" });
  next();
};

export default { signIn, signOut, requireSignIn, hasAuth };
