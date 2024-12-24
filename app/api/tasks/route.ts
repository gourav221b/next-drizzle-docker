import { NextRequest, NextResponse } from "next/server";


import { createNewTask, getAllTasks } from "@/repositories/tasks.repositories";

// GET tasks
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    try {
        const page = Number(searchParams.get('page')) || 1;
        const size = Number(searchParams.get('size')) || 1;
        const allTasks = await getAllTasks(page, size);
        return NextResponse.json(allTasks);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}

// POST task
export async function POST(req: Request) {
    try {
        const { title, description, completed } = await req.json();
        const newTask = await createNewTask({ title, description, completed });
        return NextResponse.json(newTask);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }

}

