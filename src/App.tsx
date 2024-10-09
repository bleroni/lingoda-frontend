// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:thread_id" element={<Main />} />
      </Routes>
    </Router>        
  );
};

export default App;
