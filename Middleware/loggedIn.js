export const loggedIn = async (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    res.render("UserPages/login");
  }
  next();
};
