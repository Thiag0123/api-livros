const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const livrosRoutes = require('./routes/livros');

app.use('/livros', livrosRoutes);

app.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
}); 