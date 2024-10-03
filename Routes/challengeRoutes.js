import express from "express";
import asyncHandler from "express-async-handler";
import { authorize } from "../Middleware/authorize.js";
import { loggedIn } from "../Middleware/loggedIn.js";
import {
  viewChallenge,
  newChallenge,
  createChallenge,
  giveUpChallenge,
} from "../Controllers/challengeController.js";
import { profilePage } from "../Controllers/userController.js";

const router = express.Router({ mergeParams: true });

router.get("/", profilePage);

router.get("/new", loggedIn, authorize, newChallenge);

router.get("/:challengeId", viewChallenge);

router.post("/new", loggedIn, authorize, createChallenge);

router.post("/:challengeId/giveup", loggedIn, authorize, giveUpChallenge);

export default router;
