import React from 'react';
import { Card, Typography } from '@mui/material';

// Define a type for the component's props if needed
interface ScenarioCardProps {
  title: string;
  description: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, description }) => {
  return (
    <Card
      style={{
        width: '300px',
        padding: '16px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#F7F8FC',
      }}
    >
      <Typography variant="h6" style={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
        {title}
      </Typography>
      <Typography variant="body2" style={{ color: '#666' }}>
        {description}
      </Typography>
    </Card>
  );
};

export default ScenarioCard;

// Usage Example
// <ScenarioCard title="Scenario" description="You walked into a coffee shop in Berlin, stood in line to order and now it's your turn. The barista greets you." />
