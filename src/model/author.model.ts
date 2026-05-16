import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { bookTable } from "./book.model";

export const authorTable = pgTable("author", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email : varchar({length:255}).notNull().unique()
});