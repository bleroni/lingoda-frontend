import { Dispatch, SetStateAction } from 'react';

export type TaskType = {
  task_description: string;
  task_completed: boolean;
  value: string;
};

export interface TasksProps {
  tasks: TaskType[];
}

export interface ChatComponentProps {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
}
