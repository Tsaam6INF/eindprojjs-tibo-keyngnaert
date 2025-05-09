import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/video/${id}`)
      .then(res => res.json())
      .then(setVideo);
  }, [id]);

  if (!video) return <p>Video laden...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ReactPlayer url={`http://localhost:3001/uploads/${video.filename}`} controls width="100%" />
      <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
    </div>
  );
}

export default VideoPlayer;
