import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import VideoPlayer from './pages/VideoPlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/watch/:id" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;

