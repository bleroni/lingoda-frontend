import React, { useEffect, useState } from 'react';
import '../styles/CompletionBadge.css';

interface CompletionBadgeProps {
  text?: string;
  completed: boolean;
  color?: string;
}

const CompletionBadge: React.FC<CompletionBadgeProps> = ({
  text = "Completed",
  completed,
  color = "#b4caed"
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`badge ${completed ? 'completed' : 'incomplete'} ${animate ? 'animate' : ''}`}
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
