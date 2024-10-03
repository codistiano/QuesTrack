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

router.get("/new", loggedIn, authorize, newNote);

router.get("/:noteId", viewNote);

router.get("/:noteId/edit", loggedIn, authorize, editNote);

router.post("/", loggedIn, authorize, createNote);

router.post("/:noteId", loggedIn, authorize, updateNote)

export default router;
