
import { deleteTask, updateTask } from "@/repositories/tasks.repositories";
import { NextResponse } from "next/server";


export async function PATCH(req: Request, { params }: { params: Promise<{ taskId: string }> }) {
    try {
        const taskId = (await params).taskId
        if (!taskId || isNaN(Number(taskId))) throw new Error("Task id is required to delete record")

        const data = await req.json();
        const updateObject: { id: number, title?: string, description?: string, completed?: boolean } = {
            id: Number(taskId)
        };
        if (data.title !== undefined)
            updateObject.title = data.title
        if (data.description !== undefined)
            updateObject.description = data.description
        if (data.completed !== undefined)
            updateObject.completed = data.completed

        const updatedTask = await updateTask(updateObject)
        return NextResponse.json({ message: "Task updated", data: updatedTask });
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            console.log(error)
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}


// DELETE task
export async function DELETE(req: Request, { params }: { params: Promise<{ taskId: string }> }) {
    try {
        const taskId = (await params).taskId
        if (!taskId || isNaN(Number(taskId))) throw new Error("Task id is required to delete record")
        await deleteTask(Number(taskId));
        return NextResponse.json({ message: "Task deleted" });
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }

}