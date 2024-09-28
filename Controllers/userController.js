import User from "../Models/user.js";
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler";

export const signUpPage = asyncHandler(async (req, res, next) => {
  res.render("UserPages/signup");
});

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = new User({ username, password });
  newUser.save();

  req.session.userId = newUser._id;
  res.redirect(`/user/${username}`);
});

export const loginPage = asyncHandler(async (req, res, next) => {
  res.render("UserPages/login");
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401); // unauthorized
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401); // unauthorized
    throw new Error("Invalid credentials");
  }

  req.session.userId = user._id;
  res.redirect(`/user/${username}`);
});

export const logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    res.clearCookie();
    res.status(200).render(`index`);
  });
});

export const profilePage = asyncHandler(async (req, res, next) => {
  const username = req.params.username
  const user = await User.findOne({ username });

  if (!user) {
    res.render("error")
  }

  res.render("UserPages/profile", { user });
});
