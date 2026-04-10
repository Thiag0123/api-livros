const Livro = require('../models/livroModel');

function validar(livro) {
  if (!livro.titulo || !livro.autor || !livro.ano || !livro.genero) {
    return "Todos os campos são obrigatórios";
  }
}

exports.getAll = (req, res) => {
  Livro.getAll((err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  Livro.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: "Não encontrado" });
    res.json(row);
  });
};

exports.create = (req, res) => {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  Livro.create(req.body, (err, novo) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json(novo);
  });
};

exports.update = (req, res) => {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  Livro.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Atualizado" });
  });
};

exports.patch = (req, res) => {
  Livro.patch(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Atualizado parcialmente" });
  });
};

exports.delete = (req, res) => {
  Livro.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Deletado" });
  });
};