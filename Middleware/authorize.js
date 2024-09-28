// This middleware checks whether the user is logged in or not

export const authorize = (req, res, next) => {
  if (!req.session.userId) {
    res.render("UserPages/login");
  }
  next();
};
