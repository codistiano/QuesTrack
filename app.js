import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsmate from "ejs-mate";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import flash from "connect-flash";
import asyncHandler from "express-async-handler";
import "dotenv/config";


// Route files
import userRoutes from "./Routes/userRoutes.js";
import challengeRoutes from "./Routes/challengeRoutes.js";
import noteRoutes from "./Routes/noteRoutes.js";
import indexRoute from "./Routes/indexRoute.js";

// DB connection
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database Connection Error"));
db.once("open", () => {
  console.log("Database Connected!");
});

const app = express();

// Set the public folder as the static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/Public")));

// Set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsmate);

// Made the use of the Method-override package to handle different request types
app.use(methodOverride("_method"));

// Parse incoming request body in a middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(flash());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  })
);

app.use((req, res, next) => {
  res.locals.user = req.flash("username");
  res.locals.message = req.flash("message")
  res.locals.currentUser = req.session.userId;
  res.locals.footer = true;
  res.locals.title = "QuesTrack";
  next();
});

// Define the routes

app.use("/", indexRoute);

app.use("/user", userRoutes);

app.use("/user/:username/challenges", challengeRoutes);

app.use("/user/:username/challenges/:challengeId/notes", noteRoutes);

app.use(function (err, req, res, next) {
  console.log(err.stack)
  console.error(`Error Type: ${err}`);
  res.send("Something broke")
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running`);
});
