import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/user.js";
import Challenge from "../Models/challenge.js";
import Note from "../Models/note.js";

const router = express.Router({ mergeparams: true });

export const viewNote = asyncHandler(async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  res.render("NotePages/viewNote", { title: "Title doc" });
});

export const newNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId } = req.params;
  res.render(
    "NotePages/noteEditPage",
    {
      title: "New Note",
      username,
      challengeId,
    } /** the day after calculation**/
  );
});

export const createNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId } = req.params;
  const { title, note } = req.body;
  const user = await User.findOne({ username: username });

  const newNote = new Note({
    author: user._id,
    challenge: challengeId,
    title: title,
    note: note,
  });

  await newNote.save();

  await Challenge.findByIdAndUpdate(
    { _id: challengeId },
    { $push: { notes: newNote._id } }
  );

  res.redirect(
    `/user/${username}/challenges/${challengeId}/notes/${newNote._id}`
  );
});

export const editNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, noteId } = req.params;
  const editedNote = await Note.findById(noteId);
  res.render("NotePages/editNote", {
    title: "Edit Note",
    note: editedNote,
    username,
    challengeId,
    noteId
  });
});

export const updateNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, noteId } = req.params;
  const { title, note } = req.body;

  await Note.findByIdAndUpdate(noteId, {
    title: title,
    note: note,
  });
  
  const theNote = await Note.findById(noteId)
  
  console.log(theNote, "Successfully Updated!")

  res.redirect(`/user/${username}/challenges/${challengeId}/note/${noteId}`);
});




