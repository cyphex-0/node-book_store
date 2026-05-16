import "dotenv/config";
import express from "express";
import bookRouter from "./routes/books.routes";
import authorRouter from "./routes/authors.route"
import { logger } from "./middlewares/logger";

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());

app.use(logger);

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
