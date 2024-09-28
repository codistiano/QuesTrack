import express from "express"
import asyncHandler from "express-async-handler"
import Note from "../Models/note.js"
const router = express.Router()

export default router.get("/", asyncHandler ( async (req, res, next) => {
    res.render("index")
}))