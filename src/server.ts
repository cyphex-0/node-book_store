import express from "express";
import { books } from "./bd";
import fs from "fs"

const app = express();
const PORT = 8000;

//Middleware
app.use(express.json());

app.use((req,res,next)=>{
    const date = new Date().toISOString()
    const log = `Time : ${date}, Method : ${req.method}, Route : ${req.url} \n`
    fs.appendFileSync("./Log.txt", log, "utf-8")
    next()
})

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookID = Number(req.params.id);
  if (isNaN(bookID)) {
    return res.status(400).json({ Error: `ID must be a number` });
  }
  const bookfound = books.find((book) => book.id === bookID);
  if (!bookfound) {
    return res.status(404).json({ Error: `id ${bookID} not found` });
  }
  res.json(bookfound);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || title === "" || !author || author === "") {
    return res.status(400).json({ Error: `Title and Author is needed` });
  }
  const id = books.length + 1;

  const newBook = { id, title, author };

  const prestnt = books.find(
    (book) => newBook.title === book.title && newBook.author === book.author,
  );

  if (!prestnt) {
    books.push(newBook);
    return res.status(201).json({ Message: "Book created", id });
  } else {
    return res.status(400).json({ Error: `Book is already present` });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookID = Number(req.params.id);
  if (isNaN(bookID)) {
    return res.status(400).json({ Error: `ID must be a number` });
  }
  const bookfound = books.findIndex((book) => book.id === bookID);
  if (bookfound == -1) {
    return res.status(404).json({ Error: `id ${bookID} not found` });
  }else{
    books.splice(bookfound, 1);
    return res.status(200).json({ Success: `Book deleted` });
  }  
});

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
