import TaskManager from "@/components/TaskManager";
import { getAllTasks } from "@/repositories/tasks.repositories";
import { TaskResponse } from "@/types/tasks";
import { Suspense } from "react";

async function TaskWrapper({ page, size }: { page: number; size: number }) {
  const allTasks: TaskResponse | undefined = await getAllTasks(page, size);
  if (!allTasks?.data) return <>No tasks available</>;
  return <TaskManager prev_tasks={allTasks?.data} />;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;
  const page = Number(search?.page || 1);
  const size = Number(search?.size || 10);
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <TaskWrapper page={page} size={size} />
      </Suspense>
    </main>
  );
}
