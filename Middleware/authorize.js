// This middleware checks whether the user is logged in or not
import User from "../Models/user.js"

export const authorize = async (req, res, next) => {
  try {
  const userId = req.session.userId
  const { username } = req.params;
  const user = await User.findById(userId)

  if (username === user.username) {
    next();
  } else {
    res.render("error", {message: "You are not authorized to access this page"})
  }
  } catch (err) {
    return res.render("error", { message: err})
  }
};