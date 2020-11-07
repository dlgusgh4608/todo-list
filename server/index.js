require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const path = require('path');
const PORT = process.env.PORT || 4000;
const TodoService = require('./services/todo');

const pool = require('./db');
const todoService = new TodoService(pool);

app.use(cors());
app.use(express.json());

require('./controllers/todo')(router, todoService);

app.use(router);

const buildPath = path.resolve(__dirname, '../build');

app.get('*.*', (req, res) => {
  res.sendFile(path.join(buildPath, req.url));
});

app.get('*', (_, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
