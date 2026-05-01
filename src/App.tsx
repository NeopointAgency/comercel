import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AjoMayoreoCancun from './pages/AjoMayoreoCancun';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajo-mayoreo-cancun" element={<AjoMayoreoCancun />} />
      </Routes>
    </Router>
  );
}
