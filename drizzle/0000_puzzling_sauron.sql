CREATE TABLE "tasks_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"completed" boolean DEFAULT false
);
