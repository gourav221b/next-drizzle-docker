import { Check, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Task } from "@/types/tasks";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number, state: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedTasks((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  if (tasks.length === 0) {
    return (
      <p className='text-center text-gray-500'>No tasks yet. Add one above!</p>
    );
  }

  return (
    <ul className='space-y-4'>
      {tasks.map((task) => (
        <li
          key={task.id}
          className='bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all duration-200 ease-in-out'
        >
          <div className='flex items-center gap-2 p-4'>
            <Button
              variant='outline'
              size='icon'
              className={`shrink-0 ${
                task.completed
                  ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                  : ""
              }`}
              onClick={() => onToggle(task.id, Boolean(task.completed))}
            >
              <Check
                className={`h-4 w-4 ${
                  task.completed ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className='sr-only'>
                Mark task as {task.completed ? "incomplete" : "complete"}
              </span>
            </Button>
            <div className='flex-grow'>
              <h3
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm text-gray-500 dark:text-gray-400 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {expandedTasks.includes(task.id)
                    ? task.description
                    : `${task.description.slice(0, 50)}${
                        task.description.length > 50 ? "..." : ""
                      }`}
                </p>
              )}
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              onClick={() => toggleExpand(task.id)}
            >
              {expandedTasks.includes(task.id) ? (
                <ChevronUp className='h-4 w-4' />
              ) : (
                <ChevronDown className='h-4 w-4' />
              )}
              <span className='sr-only'>Toggle task description</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='shrink-0 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className='h-4 w-4' />
              <span className='sr-only'>Delete task</span>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
