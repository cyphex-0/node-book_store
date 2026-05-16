import express from "express";
import { getAuthor, createAuthor } from "../controllers/authors.controller";
const router = express.Router();

router.get("/", getAuthor);
router.post("/", createAuthor)


export default router