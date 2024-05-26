import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    return res.status(400).json({ message: "All fields are required." });
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
    res.status(500).json({ message: error.message });
  }
};
