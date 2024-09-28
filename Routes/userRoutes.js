import express from "express";
import {
  signUpPage,
  signUp,
  loginPage,
  login,
  logout,
  profilePage,
} from "../Controllers/userController.js";

const router = express.Router();

router.get("/signup", signUpPage);

router.post("/signup", signUp);

router.get("/login", loginPage);

router.post("/login", login);

router.post("/logout", logout);

router.get("/:username", profilePage);

// Nested these route here to make them able to handle the params that are passed
import challengeRoutes from "./challengeRoutes.js";
router.use("/:username/challenges", challengeRoutes)

import noteRoutes from "./noteRoutes.js"
router.use("/:username/challenges/:challengeId/notes", noteRoutes)

export default router;
