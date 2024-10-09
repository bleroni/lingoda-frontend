import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Tasks.css'; // Optional CSS file for styling

interface TaskType {
  description: string;
  completed: boolean;
}

// Define the Tasks interface
interface TasksType {
  [key: string]: TaskType;
}

const initialTasks: TasksType = {
    task_1: {
      description: "Greet the doctor",
      completed: true
    },
    task_2: {
      description: "Describe your symptoms",
      completed: false
    },
    task_3: {
      description: "Ask about medication",
      completed: false
    },
    task_4: {
      description: "Thank the doctor and say goodbye",
      completed: false
    }
};

const Tasks: React.FC = () => {
  const { thread_id } = useParams<{ thread_id: string }>();
  const [tasks, setTasks] = useState<TasksType>(initialTasks);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchLingodaMessages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/lingoda/all_messages/${thread_id}`);
        setTasks(response.data.tasks);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchLingodaMessages();
  }, [thread_id]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tasks-container">
      <h2>Your tasks</h2>
      <p>Finish all of the tasks within 10 messages</p>
      {loading ? 
          <p>Loading tasks...</p> 
          :
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
      }
      {JSON.stringify(tasks)}          
    </div>
  );
};

export default Tasks;
