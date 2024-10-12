import User from "../Models/user.js";
import Challenge from "../Models/challenge.js"
import asyncHandler from "express-async-handler";

export const signUpPage = asyncHandler(async (req, res, next) => {
  res.render("UserPages/signup", { footer: false, message: "" });
});

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    res.status(400);
    return res.render("UserPages/signup", {
      message: "This username is taken!",
    });
  }

  const newUser = new User({ username, password });
  await newUser.save();

  req.session.userId = newUser._id;
  res.redirect(`/user/${username}`);
});

export const loginPage = asyncHandler(async (req, res, next) => {
  res.render("UserPages/login", { footer: false , message: ""  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401); // unauthorized
    return res.render("UserPages/login", { message: "Incorrect Username or Password" });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401); // unauthorized
    return res.render("UserPages/login", { message: "Incorrect Username or Password" });
  }

  req.session.userId = user._id;
  res.redirect(`/user/${username}`);
});

export const logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => {
    res.clearCookie();
    res.status(200).redirect("/");
  });
});

export const profilePage = asyncHandler(async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({ username });
  const currentUser = await User.findOne({_id: req.session.userId})

  if (!user) {
    return res.render("error", { message: "Username Not Found!" });
  }

  await user.populate("challenges");
  const activeChallenge = await Challenge.findOne({
    owner: user._id,
    status: "active"
  });

  let owner = (currentUser && username === currentUser.username ? true : false)

  res.render("UserPages/profile", {
    user,
    challenges: user.challenges,
    activeChallenge,
    owner,
  });
});
