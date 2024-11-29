document.addEventListener('DOMContentLoaded', () => {
    cargarContenido('inicio'); // Carga automáticamente la categoría 'inicio' al abrir la página
});

async function cargarContenido(categoria) {
    try {
        const response = await fetch(`http://localhost:3000/noticias/${categoria}`);
        if (!response.ok) {
            throw new Error('Error al obtener las noticias');
        }

        const noticias = await response.json();
        mostrarNoticias(noticias);
    } catch (error) {
        console.error(error);
        document.getElementById('contenedor-noticias').innerHTML = '<p>Error al cargar las noticias. Intente nuevamente.</p>';
    }
}

function mostrarNoticias(noticias) {
    const contenedor = document.getElementById('contenedor-noticias');
    contenedor.innerHTML = ''; // Limpiar contenedor

    noticias.forEach(noticia => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.classList.add('noticia');

        noticiaDiv.innerHTML = `
            <div class="noticia-header">
                <h2>${noticia.titulo}</h2>
            </div>
            <div class="noticia-body">
                <img src="${noticia.imagen}" alt="Imagen de la noticia">
                <p>${noticia.contenido}</p>
                <a href="#" class="leer-mas" data-categoria="${noticia.categoria}">Ir a esta categoria --></a>
                <button class="eliminar-noticia" data-id="${noticia._id}">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(noticiaDiv);
    });

    document.querySelectorAll('.eliminar-noticia').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const noticiaId = e.target.getAttribute('data-id');
            await eliminarNoticia(noticiaId, e.target.parentElement);
        });
    });

    document.querySelectorAll('.leer-mas').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = e.target.getAttribute('data-categoria');
            cargarContenido(categoria);
        });
    });

    async function eliminarNoticia(id, elemento) {
        try {
            const respuesta = await fetch(`http://localhost:3000/noticias/${id}`, {
                method: 'DELETE',
            });
    
            if (respuesta.ok) {
                // Eliminar el contenedor completo de la noticia del DOM
                const contenedorNoticia = elemento.closest('.noticia');
                if (contenedorNoticia) {
                    contenedorNoticia.remove();
                }
            } else {
                console.error('Error al eliminar la noticia');
            }
        } catch (error) {
            console.error('Error en la conexión al eliminar la noticia:', error);
        }
    }
}
