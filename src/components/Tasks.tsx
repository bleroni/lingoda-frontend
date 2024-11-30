import React from 'react';
import { TasksProps } from '../types';
import '../styles/Tasks.css';

const Tasks: React.FC<TasksProps> = ({ tasks }) => {

  return (
    <div className="tasks-container">
      <h2>Trucker onboarding checklist</h2>
      {/* <p>Trucker onboarding checklist</p> */}
          <ul>
            {Object.entries(tasks).map(([key, task]) => (
              <li key={key} className={task.task_completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.task_completed}
                  onChange={() => {}}
                />
                {task.task_description}
              </label>
            </li>
            ))}
          </ul>
    </div>
  );
};

export default Tasks;
