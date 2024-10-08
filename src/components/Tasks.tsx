import React, { useState } from 'react';
import '../styles/Tasks.css'; // Optional CSS file for styling

type Task = {
  id: number;
  description: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, description: 'Greet the waiter appropriately', completed: true },
  { id: 2, description: 'Ask if they have oat milk', completed: false },
  { id: 3, description: 'Order a coffee with oat milk', completed: false },
  { id: 4, description: 'Order a slice of chocolate cake to go with it', completed: false },
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="tasks-container">
      <h2>Your tasks</h2>
      <p>Finish all of the tasks within 10 messages</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
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
