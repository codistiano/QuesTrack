import express from "express";
import {
  signUpPage,
  signUp,
  loginPage,
  login,
  logout,
  profilePage,
} from "../Controllers/userController.js";
import { validateLogin, validateSignup } from "../Middleware/validation.js";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  res.redirect(`/`);
});

router.get("/signup", signUpPage);

router.post("/signup", validateSignup, signUp);

router.get("/login", loginPage);

router.post("/login", validateLogin, login);

router.get("/logout", logout);

router.get("/:username", profilePage);

export default router;
