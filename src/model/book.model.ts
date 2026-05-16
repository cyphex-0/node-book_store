import { pgTable,uuid, text, varchar } from "drizzle-orm/pg-core";
import { authorTable } from "./author.model";

export const bookTable= pgTable("book", {
    id : uuid().primaryKey().defaultRandom(),
    title : varchar({length : 50}).notNull(),
    description : text(),
    authorId : uuid().references(()=>authorTable.id).notNull(),
})
