document.getElementById('form-noticia').addEventListener('submit', async function (event) {
    event.preventDefault();

    const noticia = {
        titulo: document.getElementById('titulo').value,
        contenido: document.getElementById('contenido').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value,
        fecha: new Date(),
    };

    try {
        const respuesta = await fetch('http://localhost:3000/noticias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticia),
        });

        if (respuesta.ok) {
            alert('Noticia agregada correctamente.');
            document.getElementById('form-noticia').reset();
        } else {
            alert('Error al agregar la noticia.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    }
});
