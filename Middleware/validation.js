import {
  createNoteSchema,
  editNoteSchema,
} from "../validation/note.validation.js";
import { loginSchema, signupSchema } from "../validation/user.validation.js";
import { challengeSchema } from "../validation/challenge.validation.js";

const validateUserLogin = (validationFunc) => {
  return (req, res, next) => {
    const { error } = validationFunc(req.body); // or req.params depending on validation type
    if (error) {
      return res.render("UserPages/login", { message: error.message });
    }
    next();
  };
};

const validateUserSignup = (validationFunc) => {
  return (req, res, next) => {
    const { error } = validationFunc(req.body); // or req.params depending on validation type
    if (error) {
      return res.render("UserPages/signup", { message: error.message });
    }
    next();
  };
};

const validateNoteCreation = (validationFunc) => {
  return (req, res, next) => {
    const { error } = validationFunc(req.body); // or req.params depending on validation type
    if (error) {
      req.session.errorMessage = error.details[0].message;
      req.session.returnTo = req.originalUrl
      return res.redirect(req.originalUrl);
    }
    next();
  };
};

const validateNoteEdition = (validationFunc) => {
  return (req, res, next) => {
    const { error } = validationFunc(req.body); // or req.params depending on validation type
    if (error) {
      req.session.errorMessage = error.details[0].message;
      req.session.returnTo = req.originalUrl;
      return res.redirect(req.session.returnTo);
    }
    next();
  };
};

const challengeValidation = (validationFunc) => {
  return (req, res, next) => {
    const { error } = validationFunc(req.body);
    if (error) {
      req.session.errorMessage = error.details[0].message;
      req.session.returnTo = req.originalUrl;
      return res.redirect(req.session.returnTo);
    }
    next();
  };
};

export const validateLogin = validateUserLogin(loginSchema);
export const validateSignup = validateUserSignup(signupSchema);
export const validateCreateNote = validateNoteCreation(createNoteSchema);
export const validateEditNote = validateNoteEdition(editNoteSchema);
export const validateChallenge = challengeValidation(challengeSchema);
