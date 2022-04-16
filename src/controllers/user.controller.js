import User from "../models/user.model";
import { extend } from "lodash";
import errorHandler from "./error.controller";

/*
   This function creates a new user with the user JSON object that's received in the POST request
   based on User schema
*/
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

/*
   This function finds all the users from the database, populates only the
   name, email, created, and updated fields in the resulting user list, and then returns
   this list of users as JSON objects in an array.
*/
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
const userByID = (req, res, next, id) => {};
const read = (req, res) => {};
const update = (req, res, next) => {};
const remove = (req, res, next) => {};

export default { create, list, userByID, read, update, remove };
