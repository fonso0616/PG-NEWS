const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = mongoose.Types; // Para manejar ObjectId

// Configurar aplicación
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://pagc0616:G6Z5SzXvJoEvOPDI@cluster0.t2yok.mongodb.net/Base-Final?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB Atlas exitosa'))
.catch((error) => console.error('Error al conectar con MongoDB Atlas:', error));

// Esquema de Noticias
const noticiaSchema = new mongoose.Schema({
    titulo: String,
    contenido: String,
    fecha: Date,
    imagen: String,
    categoria: String,
});

const Noticia = mongoose.model('Noticia', noticiaSchema);

// Rutas
app.get('/noticias/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const noticias = await Noticia.find(categoria === 'inicio' ? {} : { categoria });
        res.json(noticias);
    } catch (error) {
        res.status(500).send('Error al obtener las noticias');
    }
});

app.post('/noticias', async (req, res) => {
    try {
        const nuevaNoticia = new Noticia(req.body);
        await nuevaNoticia.save();
        res.status(201).send('Noticia creada');
    } catch (err) {
        res.status(400).send('Error al crear noticia');
    }
});

// Endpoint para eliminar noticias por ID
app.delete('/noticias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Noticia.deleteOne({ _id: new ObjectId(id) });

        if (resultado.deletedCount === 1) {
            res.status(200).send('Noticia eliminada');
        } else {
            res.status(404).send('Noticia no encontrada');
        }
    } catch (error) {
        console.error('Error al eliminar noticia:', error);
        res.status(500).send('Error al eliminar la noticia');
    }
});

// Iniciar Servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
