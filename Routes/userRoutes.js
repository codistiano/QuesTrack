import express from "express";
import {
  signUpPage,
  signUp,
  loginPage,
  login,
  logout,
  profilePage,
} from "../Controllers/userController.js";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  res.redirect(`/`);
});

router.get("/signup", signUpPage);

router.post("/signup", signUp);

router.get("/login", loginPage);

router.post("/login", login);

router.get("/logout", logout);

router.get("/:username", profilePage);

export default router;
