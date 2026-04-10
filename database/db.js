const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/livros.db', (err) => {
  if (err) console.log(err);
  else console.log("Banco conectado");
});

db.run(`
CREATE TABLE IF NOT EXISTS livros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano INTEGER NOT NULL,
  genero TEXT NOT NULL
)
`);

module.exports = db;