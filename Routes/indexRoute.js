import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/user.js";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.render("index", { title: "QuesTrack" });
  })
);

router.get(
  "/me",
  asyncHandler(async (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect("/user/login");
    } else {
      const user = await User.findById(userId);
      return res.redirect(`/user/${user.username}`);
    }
  })
);

router.get("/article", asyncHandler(async (req, res, next) => {
  res.render("article")
}));

router.get('/explore', (req, res) => {
  res.render('explore', { title: 'Explore' });
});


export default router;
