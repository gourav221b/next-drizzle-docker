import { db } from "@/config/db"
import { tasks } from "@/config/db/schema"
import { determinePagination } from "@/lib/utils"
import { count, eq, sql } from "drizzle-orm"

const taskReponseBody = {
    id: tasks.id,
    title: tasks.title,
    description: tasks.description,
    completed: tasks.completed
}
const allTasksCount = db.select({ total: count() })
    .from(tasks).prepare("all_tasks_count")
const allTasksQuery = db.select(taskReponseBody)
    .from(tasks)
    .limit(sql.placeholder('size'))
    .offset((Number(sql.placeholder('page')) - 1) * Number(sql.placeholder('size')))
    .prepare("all_tasks")


const getAllTasks = async (page = 1, size = 10) => {
    try {

        const [totalResult, data] = await Promise.all([
            allTasksCount.execute(),
            allTasksQuery.execute({ page, size }),
        ]);
        const total = totalResult[0].total
        return { total, data, ...determinePagination(total, page, size) };
    } catch (error: unknown) {
        console.log(error)
        if (error instanceof Error)
            throw new Error(error.message);
    }
}

const createNewTask = async (data: typeof tasks.$inferInsert) => {
    if (!data.title) throw new Error("Title is required")
    const createdTask = await db.insert(tasks).values({ title: data.title, description: data.description, completed: data.completed }).returning();

    return createdTask
}

const deleteTask = async (id: number) => {
    const deletedTask = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return deletedTask
}

const updateTask = async (data: { id: number, title?: string, description?: string, completed?: boolean }) => {
    if (!data.id) throw new Error("Task id is required")
    const updatedTask = await db.update(tasks).set(data).where(eq(tasks.id, data.id)).returning();
    return updatedTask
}

export { getAllTasks, createNewTask, deleteTask, updateTask }