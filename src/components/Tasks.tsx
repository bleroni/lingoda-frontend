import React from 'react';
import { TasksProps } from '../types';
import '../styles/Tasks.css';

const Tasks: React.FC<TasksProps> = ({ tasks }) => {

  return (
    <div className="tasks-container">
      <h2>Your tasks</h2>
      <p>Finish all of the tasks within 10 messages</p>
          <ul>
            {Object.entries(tasks).map(([key, task]) => (
              <li key={key} className={task.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {}}
                />
                {task.description}
              </label>
            </li>
            ))}
          </ul>
    </div>
  );
};

export default Tasks;
