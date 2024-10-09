import React from 'react';
import { TasksProps } from '../types';
import CompletionBadge from './CompletionBadge';
import '../styles/Tasks.css'; // Optional CSS file for styling

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const allTasksCompleted = Object.values(tasks).every(task => task.completed === true);

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
          {allTasksCompleted && 
            <CompletionBadge text="Chapter Completed" completed={true} />
          }  
    </div>
  );
};

export default Tasks;
