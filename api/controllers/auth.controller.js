import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const username1 = username.trim();
  const email1 = email.trim();
  const password1 = password.trim();
  // console.log(username1.length, email1.length, password1.length);

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const email1 = email.trim();
  const password1 = password.trim();

  if (!email1 || !password1 || password1.length === 0 || email1.length === 0) {
    return next(errhandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email: email1 });

    if (!validUser) {
      return next(errhandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password1, validUser.password);

    if (!validPassword) {
      return next(errhandler(400, "Invalid Password"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_KEY
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlephotourl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const randompassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hash_password = bcryptjs.hashSync(randompassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-3),
        email: email,
        password: hash_password,
        profilepic: googlephotourl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
