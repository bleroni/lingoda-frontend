import { Dispatch, SetStateAction } from 'react';

export interface TaskType {
  description: string;
  completed: boolean;
}

export interface TasksType {
  [key: string]: TaskType;
}

export interface TasksProps {
  tasks: TasksType;
}

export interface ChatComponentProps {
  setTasks: Dispatch<SetStateAction<TasksType>>;
}
