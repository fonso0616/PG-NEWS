const mongoose = require('mongoose');
const Noticia = require('./models/Noticia'); // Ruta correcta al modelo Noticia
const fs = require('fs');

mongoose.connect('mongodb+srv://pagc0616:G6Z5SzXvJoEvOPDI@cluster0.t2yok.mongodb.net/Base-Final?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexión a MongoDB Atlas exitosa');
  cargarNoticias();
})
.catch((error) => console.error('Error al conectar con MongoDB Atlas:', error));

async function cargarNoticias() {
  try {
    const datos = fs.readFileSync('noticias.json', 'utf8');
    const noticias = JSON.parse(datos);
    await Noticia.insertMany(noticias); // Usa el modelo Noticia correctamente
    console.log('Noticias agregadas exitosamente');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error al agregar noticias:', error);
    mongoose.connection.close();
  }
}
