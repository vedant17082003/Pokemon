import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Pokemon from './Pokemon'; // Import the Pokemon component
import './App.css';

function App() {
  return (
    <Router>
      <div className='bg-black'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
