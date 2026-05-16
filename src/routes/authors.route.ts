import express from "express";
import { getAuthor, createAuthor, deleteAuthor } from "../controllers/authors.controller";
const router = express.Router();

router.get("/", getAuthor);
router.post("/", createAuthor)
router.delete("/:id", deleteAuthor)


export default router