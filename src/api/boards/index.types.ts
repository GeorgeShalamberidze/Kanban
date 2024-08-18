export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  id: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Task[];
  bgColor: string;
}

export interface BoardData {
  name: string;
  columns: Column[];
  id: number | string;
}

export type BoardDataResponse = {
  boards: BoardData[];
};
