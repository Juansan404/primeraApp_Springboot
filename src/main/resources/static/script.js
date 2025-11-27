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
                <td class="acciones">
                    <button class="btn-editar" data-id="${enemigo.id}">Editar</button>
                    <button class="btn-eliminar" data-id="${enemigo.id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);

            // Agregar event listeners a los botones
            const btnEliminar = fila.querySelector('.btn-eliminar');
            btnEliminar.addEventListener('click', () => eliminarEnemigo(enemigo.id));

            const btnEditar = fila.querySelector('.btn-editar');
            btnEditar.addEventListener('click', () => cargarEnemigoParaEditar(enemigo));
        });

        loading.style.display = 'none';
        tabla.style.display = 'table';
    } catch (error) {
        console.error('Error al cargar enemigos:', error);
        document.getElementById('loading').textContent = 'Error al cargar enemigos';
    }
}

// Función para crear o actualizar un enemigo
async function crearEnemigo(event) {
    event.preventDefault();

    const form = document.getElementById('enemigoForm');
    const mensaje = document.getElementById('mensaje');
    const enemigoId = document.getElementById('enemigoId').value;

    // Obtener los datos del formulario
    const enemigo = {
        nombre: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        pais_origen: document.getElementById('pais').value,
        nivel_amenaza: parseInt(document.getElementById('nivelamenaza').value),
        activo: document.getElementById('activo').checked
    };

    try {
        let response;
        if (enemigoId) {
            // Actualizar enemigo existente
            response = await fetch(`/api/enemigo/${enemigoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enemigo)
            });
        } else {
            // Crear nuevo enemigo
            response = await fetch('/api/enemigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enemigo)
            });
        }

        if (response.ok) {
            const enemigoGuardado = await response.json();
            mensaje.textContent = enemigoId
                ? `Enemigo "${enemigoGuardado.nombre}" actualizado exitosamente!`
                : `Enemigo "${enemigoGuardado.nombre}" creado exitosamente!`;
            mensaje.className = 'mensaje exito';

            // Limpiar el formulario
            form.reset();
            document.getElementById('enemigoId').value = '';
            document.getElementById('formTitulo').textContent = 'Agregar Nuevo Enemigo';
            document.getElementById('btnSubmit').textContent = 'Agregar Enemigo';
            document.getElementById('btnCancelar').style.display = 'none';

            // Recargar la tabla de enemigos
            const tbody = document.getElementById('listaEnemigos');
            tbody.innerHTML = '';
            const loading = document.getElementById('loading');
            const tabla = document.getElementById('tablaEnemigos');
            loading.style.display = 'block';
            tabla.style.display = 'none';
            await cargarEnemigos();
        } else {
            const error = await response.text();
            mensaje.textContent = `Error al guardar enemigo: ${error}`;
            mensaje.className = 'mensaje error';
        }
    } catch (error) {
        console.error('Error al guardar enemigo:', error);
        mensaje.textContent = `Error al guardar enemigo: ${error.message}`;
        mensaje.className = 'mensaje error';
    }

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
        mensaje.textContent = '';
        mensaje.className = 'mensaje';
    }, 5000);
}

// Función para cargar enemigo en el formulario para editar
function cargarEnemigoParaEditar(enemigo) {
    document.getElementById('enemigoId').value = enemigo.id;
    document.getElementById('nombre').value = enemigo.nombre;
    document.getElementById('genero').value = enemigo.genero;
    document.getElementById('pais').value = enemigo.pais_origen;
    document.getElementById('nivelamenaza').value = enemigo.nivel_amenaza;
    document.getElementById('activo').checked = enemigo.activo;

    // Cambiar el texto del formulario
    document.getElementById('formTitulo').textContent = 'Editar Enemigo';
    document.getElementById('btnSubmit').textContent = 'Actualizar Enemigo';
    document.getElementById('btnCancelar').style.display = 'inline-block';

    // Scroll al formulario
    document.getElementById('enemigoForm').scrollIntoView({ behavior: 'smooth' });
}

// Función para cancelar la edición
function cancelarEdicion() {
    const form = document.getElementById('enemigoForm');
    form.reset();
    document.getElementById('enemigoId').value = '';
    document.getElementById('formTitulo').textContent = 'Agregar Nuevo Enemigo';
    document.getElementById('btnSubmit').textContent = 'Agregar Enemigo';
    document.getElementById('btnCancelar').style.display = 'none';
}

// Función para eliminar un enemigo
async function eliminarEnemigo(id) {
    const mensaje = document.getElementById('mensaje');

    if (!confirm('¿Estás seguro de que quieres eliminar este enemigo?')) {
        return;
    }

    try {
        const response = await fetch(`/api/enemigo/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mensaje.textContent = 'Enemigo eliminado exitosamente!';
            mensaje.className = 'mensaje exito';

            // Recargar la tabla de enemigos
            const tbody = document.getElementById('listaEnemigos');
            tbody.innerHTML = '';
            const loading = document.getElementById('loading');
            const tabla = document.getElementById('tablaEnemigos');
            loading.style.display = 'block';
            tabla.style.display = 'none';
            await cargarEnemigos();
        } else {
            const error = await response.text();
            mensaje.textContent = `Error al eliminar enemigo: ${error}`;
            mensaje.className = 'mensaje error';
        }
    } catch (error) {
        console.error('Error al eliminar enemigo:', error);
        mensaje.textContent = `Error al eliminar enemigo: ${error.message}`;
        mensaje.className = 'mensaje error';
    }

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
        mensaje.textContent = '';
        mensaje.className = 'mensaje';
    }, 5000);
}

// Cargar enemigos cuando la página esté lista
window.addEventListener('DOMContentLoaded', () => {
    cargarEnemigos();

    // Agregar el evento submit al formulario
    const form = document.getElementById('enemigoForm');
    form.addEventListener('submit', crearEnemigo);

    // Agregar evento al botón cancelar
    const btnCancelar = document.getElementById('btnCancelar');
    btnCancelar.addEventListener('click', cancelarEdicion);
});