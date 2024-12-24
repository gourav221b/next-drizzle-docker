export interface TaskResponse {
    total: number,
    data: Task[],
    hasNextPage: boolean,
    hasPrevPage: boolean
}
export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean | null;
}
