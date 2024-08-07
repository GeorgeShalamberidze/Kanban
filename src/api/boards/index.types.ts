export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Column {
  name: string;
  tasks: Task[];
}

export interface BoardData {
  name: string;
  columns: Column[];
  id: number | string;
}

export type BoardDataResponse = {
  boards: BoardData[];
};
