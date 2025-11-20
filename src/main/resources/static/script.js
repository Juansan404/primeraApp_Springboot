async function cargarEnemigos() {
    try {
        const response = await fetch('/api/enemigo');
        const enemigos = await response.json();

        const tbody = document.getElementById('listaEnemigos');
        const loading = document.getElementById('loading');
        const tabla = document.getElementById('tablaEnemigos');

        if (enemigos.length === 0) {
            loading.textContent = 'No hay enemigos registrados';
            return;
        }

        enemigos.forEach(enemigo => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${enemigo.id}</td>
                <td>${enemigo.nombre}</td>
                <td>${enemigo.genero || 'N/A'}</td>
                <td>${enemigo.pais_origen || 'N/A'}</td>
                <td>${enemigo.nivel_amenaza || 'N/A'}</td>
                <td>${enemigo.activo ? 'Sí' : 'No'}</td>
            `;
            tbody.appendChild(fila);
        });

        loading.style.display = 'none';
        tabla.style.display = 'table';
    } catch (error) {
        console.error('Error al cargar enemigos:', error);
        document.getElementById('loading').textContent = 'Error al cargar enemigos';
    }
}

// Cargar enemigos cuando la página esté lista
window.addEventListener('DOMContentLoaded', cargarEnemigos);