import User from "../models/user.model";
import { extend } from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

/**
 * Creates a new user with the user JSON object that's received in the POST
 * request based on User schema.
 **/
const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully singed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/**
 * Returns all users in database.
 **/
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/**
 * Searches for a matching user in the database, if the user is found then
 * is appended to the request object in the profile key.
 **/
const userByID = async (req, res, next, id) => {
  try {
    let user = User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    res.status(400).json({
      error: "Could not retrive user",
    });
  }
};

/**
 * Retrieves the user by it's id and removes sensitive information (hashed_password, salt values)
 * before sending to the client.
 **/
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profiel.salt = undefined;
  return res.json(resq.profile);
};

/**
 * Retrives the user by it's id, updates the user's data and removes sensitive information
 * (hashed_password, salt values) before sending the updated user to the client.
 **/
const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/**
 * Deletes the user from the database and removes sensitive information
 * (hashed_password, salt values) before sending the deleted user to the client.
 **/
const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, list, userByID, read, update, remove };
