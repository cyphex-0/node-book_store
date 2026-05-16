import type { Request, Response, NextFunction } from "express";
import { db } from "../db/index";
import { and, eq } from "drizzle-orm";
import { authorTable } from "../model/author.model";

export const getAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authors = await db.select().from(authorTable);
  res.json(authors);
};

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
  return res.status(201).json({ Message: "Author register ", id: newAuthor!.id });
};

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    const authorID = req.params.id as string;
      const isPresent = await db
        .select()
        .from(authorTable)
        .where(eq(authorTable.id, authorID))
        .limit(1);
      if (isPresent.length > 0) {
        await db.delete(authorTable).where(eq(authorTable.id, authorID));
        return res.status(200).json({ Success: `Author deleted` });
      }
      return res.status(404).json({ Error: `id ${authorID} not found` });
      
}