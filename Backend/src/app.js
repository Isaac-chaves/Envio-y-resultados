import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cineRoutes from './routes/cine.routes.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, '../../Frontend');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(frontendDir, 'style.css'));
});
app.get('/script.js', (req, res) => {
  res.sendFile(path.join(frontendDir, 'script.js'));
});

const PORT = process.env.SERVER_PORT || 4000;

app.use('/api/cine', cineRoutes);

app.listen(PORT, () => {
  console.log(`API ejecutándose en http://localhost:${PORT}`);
});
