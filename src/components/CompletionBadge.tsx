import React from 'react';
import '../styles/CompletionBadge.css'; // Optional CSS file for custom styles

// Define the interface for the component props
interface CompletionBadgeProps {
  text?: string;
  completed: boolean;
  color?: string;
}

const CompletionBadge: React.FC<CompletionBadgeProps> = ({
  text = "Completed", // Default text
  completed,
  color = "#b4caed" // Default color
}) => {
  return (
    <div
      className={`badge ${completed ? 'completed' : 'incomplete'}`}
      style={{ backgroundColor: completed ? color : '#ccc' }}
    >
      {completed ? (
        <>
          <span className="badge-icon">✔️</span> {text}
        </>
      ) : (
        <>
          <span className="badge-icon">⏳</span> Not Completed
        </>
      )}
    </div>
  );
};


export default CompletionBadge;
