const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.fields([{ name: 'video' }, { name: 'thumbnail' }]), async (req, res) => {
  const { title } = req.body;
  const videoFile = req.files['video'][0];
  const thumbnailFile = req.files['thumbnail'][0];

  const newVideo = await prisma.video.create({
    data: {
      title,
      filename: videoFile.filename,
      thumbnail: thumbnailFile.filename
    }
  });

  res.json(newVideo);
});

app.get('/videos', async (req, res) => {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(videos);
});

app.get('/video/:id', async (req, res) => {
  const video = await prisma.video.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json(video);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
