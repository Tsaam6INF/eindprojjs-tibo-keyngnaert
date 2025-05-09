import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/videos')
      .then(res => setVideos(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map(video => (
        <Link key={video.id} to={`/watch/${video.id}`}>
          <div className="rounded shadow hover:shadow-lg transition">
            <img src={`http://localhost:3001/uploads/${video.thumbnail}`} alt="thumbnail" className="w-full h-48 object-cover" />
            <div className="p-2">
              <h2 className="text-lg font-semibold">{video.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Home;
