"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import TaskList from "./TaskList";
import { Task } from "@/types/tasks";

export default function TaskManager({ prev_tasks }: { prev_tasks?: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(() => prev_tasks || []);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const temp = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      completed: false,
    };
    if (newTaskTitle.trim()) {
      setTasks([...tasks, temp]);
      setNewTaskTitle("");
      setNewTaskDescription("");

      const res = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify(temp),
      });
      if (!res.ok) {
        alert("Could not save task to database");
      }
    }
  };

  const toggleTask = async (id: number, state: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !state } : task
      )
    );
    console.log({ id: id, completed: !state });
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ id: id, completed: !state }),
    });
    if (!res.ok) {
      alert("Could not save task to database");
    }
  };

  const deleteTask = async (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Could not save task to database");
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto my-10'>
      <CardContent className='p-6'>
        <form onSubmit={addTask} className='space-y-4 mb-6'>
          <Input
            type='text'
            placeholder='Task title...'
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className='w-full'
          />
          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder='Task description...'
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className='flex-grow'
            />
            <Button type='submit'>
              <Plus className='mr-2 h-4 w-4' /> Add Task
            </Button>
          </div>
        </form>
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </CardContent>
    </Card>
  );
}
