import Challenge from "../Models/challenge.js";
import User from "../Models/user.js";
import asyncHandler from "express-async-handler";
import { calculateDateDifference } from "../util/util.js";
import "dotenv/config";



export const viewChallenge = asyncHandler(async (req, res, next) => {
  const { username, challengeId } = req.params;
  const challenge = await Challenge.findOne({ _id: challengeId });
  await challenge.populate("journal");
  const challengeDay = challenge.status !== "active"?
                       calculateDateDifference(challenge.dateStarted, challenge.endDate):
                       calculateDateDifference(challenge.dateStarted,new Date(new Date().toISOString().split("T")[0]));

  const isOwner =
    req.session.userId &&
    challenge.owner.toString() === req.session.userId.toString();

  res.render("ChallengePages/challengeView", {
    challenge,
    username,
    challengeDay,
    isOwner,
  });
});

export const newChallenge = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.session.userId });

  const activeChallenge = await Challenge.findOne({
    owner: req.session.userId,
    status: "active",
  });

  const errorMessage = req.session.errorMessage;

  delete req.session.errorMessage;
  delete req.session.returnTo;

  res.render("ChallengePages/newChallenge", {
    user,
    activeChallenge: activeChallenge || null,
    footer: false,
    message: errorMessage
  });
});

export const createChallenge = asyncHandler(async (req, res, next) => {
  // Before creating check if there is any other active challenge going on to make it cancelled
  const idUser = req.session.userId;
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
    { status: "cancelled", endDate:new Date().toISOString().split("T")[0] }
  );

  res.redirect(`/user/${req.params.username}`);
});

export const activateChallenge = asyncHandler(async (req, res, next)=>{
  const challenge = await Challenge.findOneAndUpdate(
    {_id: req.params.challengeId, status: "cancelled"},
    { status: "active"}
  );
  res.redirect(`/user/${req.params.username}`)
})
