import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks_table", {
    id: serial("id").primaryKey(),
    title: text().notNull(),
    description: text().notNull(),
    completed: boolean().default(false),
});
