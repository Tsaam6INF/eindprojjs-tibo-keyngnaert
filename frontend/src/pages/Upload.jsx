import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);
    formData.append('thumbnail', thumbnail);

    await axios.post('http://localhost:3001/upload', formData);
    alert('Upload gelukt!');
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <input
        type="text"
        placeholder="Titel van video"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
      <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
        Uploaden
      </button>
    </div>
  );
}

export default Upload;
