import { bookTable } from "../model/book.model";
import { db } from "../db/index";
import { and, eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import { authorTable } from "../model/author.model";

export const getAllBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const books = await db.select().from(bookTable);
  res.json(books);
};

export const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookID = req.params.id as string;

  const [bookfound] = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, bookID))
    .limit(1);
  if (!bookfound) {
    return res.status(404).json({ Error: `id ${bookID} not found` });
  }
  res.json(bookfound);
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, authorId } = req.body;
  if (!title || title === "" || !authorId || authorId === "") {
    return res.status(400).json({ Error: `Title and Author ID is needed` });
  }
  const isPresent = await db
    .select()
    .from(bookTable)
    .where(and(eq(bookTable.title, title), eq(bookTable.authorId, authorId)))
    .limit(1);

  if (isPresent.length > 0) {
    return res.status(400).json({ Error: `Book is already present` });
  }

  const [newBook] = await db
    .insert(bookTable)
    .values({
      title,
      authorId,
      description,
    })
    .returning({
      id: bookTable.id,
    });
  return res.status(201).json({ Message: "Book created", id: newBook!.id });
};

export const getAuthor= async (
  req: Request,
  res: Response,
  next: NextFunction,
) =>{
    const authors = await db.select().from(authorTable);
    res.json(authors);
}

export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email } = req.body;
  if (!name || name === "" || !email || email === "") {
    return res.status(400).json({ Error: `Name and Email is needed` });
  }
  const isPresent = await db
    .select()
    .from(authorTable)
    .where(eq(authorTable.email, email))
    .limit(1);
  if (isPresent.length > 0) {
    return res.status(400).json({ Error: `email is already present` });
  }
  const [newAuthor] = await db
    .insert(authorTable)
    .values({
      name,
      email,
    })
    .returning({
      id: authorTable.id,
    });
  return res.status(201).json({ Message: "Book created", id: newAuthor!.id });
};

export const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bookID = req.params.id as string;
  const isPresent = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, bookID))
    .limit(1);
  if (isPresent.length > 0) {
    return res.status(404).json({ Error: `id ${bookID} not found` });
  }
  await db.delete(bookTable).where(eq(bookTable.id, bookID));
  return res.status(200).json({ Success: `Book deleted` });
};
