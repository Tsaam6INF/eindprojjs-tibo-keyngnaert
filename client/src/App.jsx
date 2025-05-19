import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchVideos = async () => {
    const res = await axios.get('http://localhost:3001/videos');
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('video', file);
    form.append('title', title);
    form.append('description', desc);

    await axios.post('http://localhost:3001/upload', form);
    setFile(null);
    setTitle('');
    setDesc('');
    fetchVideos();
  };

  return (
    <div className="container">
      <h1>Joeptoep 🎥</h1>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Titel" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Beschrijving" value={desc} onChange={e => setDesc(e.target.value)} />
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>

      <div className="video-list">
        {videos.map(video => (
          <div className="video-card" key={video.id}>
            <video controls src={`http://localhost:3001/uploads/${video.filename}`} />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
