import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errhandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const username1 = username.trim();
  const email1 = email.trim();
  const password1 = password.trim();
  console.log(username1.length, email1.length, password1.length);

  if (
    !username1 ||
    !email1 ||
    !password1 ||
    username1.length === 0 ||
    password1.length === 0 ||
    email1.length === 0
  ) {
    next(errhandler(400, "All fields are required"));
  }

  const hash_password = bcryptjs.hashSync(password1, 10);

  const newUser = new User({
    username: username1,
    email: email1,
    password: hash_password,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};
