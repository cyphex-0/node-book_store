import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { bookTable } from "./book.model";

export const authorTable = pgTable("author", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 55 }).notNull(),
  lastName: varchar({ length: 55 }),
  email : varchar({length:255}).notNull().unique()
});