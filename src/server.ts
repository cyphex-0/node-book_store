import express from "express";
import { books } from "./db/db";
import bookRouter from "./routes/books.routes"
import { logger } from "./middlewares/logger";

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());

app.use(logger)

app.use("/books", bookRouter)


app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
