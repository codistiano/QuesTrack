import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/user.js";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.render("index", { title: "QuesTrack", active: "Home" });
  })
);

router.get(
  "/me",
  asyncHandler(async (req, res, next) => {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!userId || !user) {
      return res.redirect("/user/login");
    } else {
      return res.redirect(`/user/${user.username}`);
    }
  })
);

router.get("/article", asyncHandler(async (req, res, next) => {
  res.render("article", {active: "Article"});
}));

router.get('/explore', (req, res) => {
  res.render('explore', { title: 'Explore', active: "Explore" });
});


export default router;
