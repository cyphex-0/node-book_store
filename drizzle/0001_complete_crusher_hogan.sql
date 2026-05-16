ALTER TABLE "book" ADD COLUMN "authorName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "author" ADD COLUMN "Name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "book" ADD CONSTRAINT "book_authorName_author_Name_fk" FOREIGN KEY ("authorName") REFERENCES "public"."author"("Name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "author" DROP COLUMN "firstName";--> statement-breakpoint
ALTER TABLE "author" DROP COLUMN "lastName";