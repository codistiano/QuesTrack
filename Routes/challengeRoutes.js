import express from "express";
import asyncHandler from "express-async-handler";
import { authorize } from "../Middleware/authorize.js";
import { loggedIn } from "../Middleware/loggedIn.js";
import {
  viewChallenge,
  newChallenge,
  createChallenge,
  giveUpChallenge,
  activateChallenge,
} from "../Controllers/challengeController.js";
import { profilePage } from "../Controllers/userController.js";
import { validateChallenge } from "../Middleware/validation.js";

const router = express.Router({ mergeParams: true });

router.get("/", profilePage);

router.get("/new", loggedIn, authorize, newChallenge);

router.post("/new", loggedIn, authorize, validateChallenge, createChallenge);

router.get("/:challengeId", viewChallenge);

router.get("/:challengeId/giveup", loggedIn, authorize, giveUpChallenge);

router.get("/:challengeId/reactivate", loggedIn, authorize, activateChallenge);

export default router;
