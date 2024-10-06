import Challenge from "../Models/challenge.js";
import User from "../Models/user.js";
import asyncHandler from "express-async-handler";
import "dotenv/config";

function getChallengeDay(startDate) {
  const currentDate = new Date(new Date().toISOString().split('T')[0]); 
  const start = new Date(startDate); 

  const dayDifference = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24));

  return dayDifference + 1;
}

export const viewChallenge = asyncHandler(async (req, res, next) => {
  const { username, challengeId } = req.params;
  const challenge = await Challenge.findOne({ _id: challengeId });
  const user = await User.find({ username });
  await challenge.populate("journal")

  const challengeDay = getChallengeDay(challenge.dateStarted)

  // console.log(challenge.journal[0])

  res.render("ChallengePages/challengeView", {
    challenge,
    username,
    challengeDay
  });
});

export const newChallenge = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.session.userId });

  const activeChallenge = await Challenge.findOne({
    owner: req.session.userId,
    status: "active"
  });

  res.render("ChallengePages/newChallenge", { user, activeChallenge });
});

export const createChallenge = asyncHandler(async (req, res, next) => {
  // Before creating check if there is any other active challenge going on to make it cancelled
  const idUser = req.session.userId
  await Challenge.findOneAndUpdate(
    { owner: req.session.userId, status: "active" },
    { $set: { status: "cancelled" } }
  );

  // Now create the new one
  const { name, description, challengeType } = req.body;
  const challenge = new Challenge({
    name: name,
    description: description,
    challengeType: challengeType,
  });

  challenge.owner = req.session.userId;
  await challenge.save();
  await challenge.populate("owner");

  const user = await User.findByIdAndUpdate(
    { _id: req.session.userId },
    { $push: { challenges: challenge._id } }
  );

  res.redirect(`/user/${challenge.owner.username}/challenges/${challenge._id}`);
});

export const giveUpChallenge = asyncHandler(async (req, res, next) => {
  const challenge = await Challenge.findOneAndUpdate(
    { _id: req.params.challengeId, status: "active" },
    { status: "cancelled" }
  );
  res.redirect(`/user/${req.params.user}`);
});
