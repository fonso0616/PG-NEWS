const mongoose = require("mongoose");

const noticiaSchema = new mongoose.Schema({
    titulo: String,
    contenido: String,
    fecha: Date,
    imagen: String,
    categoria: String,
});

const Noticia = mongoose.model("Noticia", NoticiaSchema);

module.exports = Noticia;
