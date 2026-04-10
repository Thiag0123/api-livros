const db = require('../database/db');

const Livro = {

  getAll: (callback) => {
    db.all("SELECT * FROM livros", callback);
  },

  getById: (id, callback) => {
    db.get("SELECT * FROM livros WHERE id = ?", [id], callback);
  },

  create: (livro, callback) => {
    const { titulo, autor, ano, genero } = livro;

    db.run(
      "INSERT INTO livros (titulo, autor, ano, genero) VALUES (?, ?, ?, ?)",
      [titulo, autor, ano, genero],
      function(err) {
        callback(err, { id: this.lastID, ...livro });
      }
    );
  },

  update: (id, livro, callback) => {
    const { titulo, autor, ano, genero } = livro;

    db.run(
      "UPDATE livros SET titulo=?, autor=?, ano=?, genero=? WHERE id=?",
      [titulo, autor, ano, genero, id],
      callback
    );
  },

  patch: (id, dados, callback) => {
    let campos = [];
    let valores = [];

    for (let key in dados) {
      campos.push(`${key} = ?`);
      valores.push(dados[key]);
    }

    valores.push(id);

    db.run(
      `UPDATE livros SET ${campos.join(", ")} WHERE id = ?`,
      valores,
      callback
    );
  },

  delete: (id, callback) => {
    db.run("DELETE FROM livros WHERE id = ?", [id], callback);
  }
};

module.exports = Livro;