import  express from "express";
import { getAllBook, findBookById, createBook, deleteBookById} from "../controllers/book.controller";

const router = express.Router()

router.get("/", getAllBook);

router.get("/:id", findBookById);

router.post("/", createBook);

router.delete("/:id", deleteBookById);

export default router
