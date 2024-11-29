// models/noticia.js
const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: String, required: true },
  imagen: { type: String },
  categoria: { type: String, required: true }
});

const Noticia = mongoose.model('Noticia', noticiaSchema);

module.exports = Noticia;
