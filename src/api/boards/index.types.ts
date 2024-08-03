interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface Task {
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
}

export type BoardDataResponse = {
  boards: BoardData;
};
