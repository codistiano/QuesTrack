import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/user.js";
import Challenge from "../Models/challenge.js";
import Note from "../Models/note.js";

const router = express.Router({ mergeparams: true });

function getChallengeDay(startDate) {
  const currentDate = new Date(new Date().toISOString().split("T")[0]);
  const start = new Date(startDate);

  const dayDifference = Math.floor(
    (currentDate - start) / (1000 * 60 * 60 * 24)
  );

  return dayDifference + 1;
}

export const viewNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, day } = req.params;
  const note = await Note.findOne({ challenge: challengeId, day: day });

  if (!note || note.length === 0) {
    return res.render('error', {
        message: `No notes found for Day ${day}.`,
        footer: false,
        active:"Profile"
    });
  }

  res.render("NotePages/viewNote", { title: `Day ${day}`, username, note, day, active:"Profile" });
});

export const newNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, day } = req.params;
  const noteExists = await Note.findOne({ challenge: challengeId, day: day });
  const challenge = await Challenge.findOne({_id: challengeId})

  const currentDay = getChallengeDay(challenge.dateStarted)

  if (noteExists) {
    return res.render("error", {
      message: "Can't create multiple notes in the same day",
    });
  }

  if (day > currentDay) {
    return res.render("error", {
      message: "Can't create note for future day!",
      active:"Profile"
    });
  }

  const errorMessage = req.session.errorMessage;
  delete req.session.errorMessage;

  res.render("NotePages/newNote", {
    title: "New Note",
    username,
    challengeId,
    day,
    footer: false,
    message: errorMessage,
    active:"Profile"
  });
});

export const createNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, day } = req.params;
  const { title, note } = req.body;
  const user = await User.findOne({ username: username });

  const newNote = new Note({
    author: user._id,
    challenge: challengeId,
    title: title,
    note: note,
    day: parseInt(day),
    footer: false,
  });

  await newNote.save();

  await Challenge.findByIdAndUpdate(
    { _id: challengeId },
    { $push: { journal: newNote._id } }
  );

  res.redirect(`/user/${username}/challenges/${challengeId}/notes/${day}`);
});

export const editNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, day } = req.params;
  const editedNote = await Note.findOne({ challenge: challengeId, day: day });

  const errorMessage = req.session.errorMessage;
  delete req.session.errorMessage;
  
  res.render("NotePages/editNote", {
    title: "Edit Note",
    note: editedNote,
    username,
    challengeId,
    day,
    footer: false,
    message: errorMessage,
    active:"Profile"
  });
});

export const updateNote = asyncHandler(async (req, res, next) => {
  const { username, challengeId, day } = req.params;
  const { title, note } = req.body;

  await Note.findOneAndUpdate({challenge: challengeId, day: day}, {
    title: title,
    note: note,
  });

  res.redirect(`/user/${username}/challenges/${challengeId}/notes/${day}`);
});
