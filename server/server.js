const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  const { title, description } = req.body;
  const filename = req.file.filename;

  db.run(`INSERT INTO videos (title, description, filename) VALUES (?, ?, ?)`, [title, description, filename], function(err) {
    if (err) return res.status(500).send(err);
    res.json({ id: this.lastID });
  });
});

app.get('/videos', (req, res) => {
  db.all('SELECT * FROM videos ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.listen(port, () => console.log(`Joeptoep backend running on http://localhost:${port}`));
