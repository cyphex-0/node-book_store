import { books } from "../model/db";
import type { Request, Response, NextFunction } from "express";

export const getAllBook = (req: Request, res: Response, next: NextFunction) => {
  res.json(books);
};

export const findBookById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookID = Number(req.params.id);
  if (isNaN(bookID)) {
    return res.status(400).json({ Error: `ID must be a number` });
  }
  const bookfound = books.find((book) => book.id === bookID);
  if (!bookfound) {
    return res.status(404).json({ Error: `id ${bookID} not found` });
  }
  res.json(bookfound);
};

export const createBook = (req: Request, res: Response, next: NextFunction) => {
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
};

export const deleteBookById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookID = Number(req.params.id);
  if (isNaN(bookID)) {
    return res.status(400).json({ Error: `ID must be a number` });
  }
  const bookfound = books.findIndex((book) => book.id === bookID);
  if (bookfound == -1) {
    return res.status(404).json({ Error: `id ${bookID} not found` });
  } else {
    books.splice(bookfound, 1);
    return res.status(200).json({ Success: `Book deleted` });
  }
};
