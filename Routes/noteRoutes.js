import express from "express";
import { viewChallenge } from "../Controllers/challengeController.js";
import { loggedIn } from "../Middleware/loggedIn.js"
import {
  createNote,
  editNote,
  newNote,
  updateNote,
  viewNote,
} from "../Controllers/noteController.js";
import { authorize } from "../Middleware/authorize.js";
const router = express.Router({ mergeParams: true });

router.get("/", viewChallenge);

router.get("/:day", viewNote);

router.get("/:day/new", loggedIn, authorize, newNote);

router.get("/:day/edit", loggedIn, authorize, editNote);

router.post("/:day", loggedIn, authorize, createNote);

router.post("/:day/edit", loggedIn, authorize, updateNote)

export default router;
