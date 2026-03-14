// Aqui estaran todos los UI states 

// Contenedor principal donde se renderizan los posts
const container = document.getElementById("postsContainer");

// Estado inicial (idle)
// Se muestra antes de hacer cualquier petición
export function renderIdle(){
    container.innerHTML = `
        <p>Presiona el botón para cargar los posts.</p>
    `;
}


// Estado de carga
// Se muestra mientras se obtienen datos de la API
export function renderLoading(){
    container.innerHTML = `
        <p>Cargando posts...</p>
    `;
}


// Estado de éxito
// Aquí se mostrarán los posts cuando la API responda correctamente
export function renderSuccess(postsHTML){
    container.innerHTML = postsHTML;
}


// Estado vacío
// Cuando la API responde pero no hay resultados
export function renderEmpty(){
    container.innerHTML = `
        <p>No hay posts disponibles.</p>
    `;
}


// Estado de error
// Incluye botón de retry para volver a intentar la petición
export function renderError(retryCallback){
    container.innerHTML = `
        <p>Error al cargar los posts.</p>
        <button id="retryBtn">Reintentar</button>
    `;

    document.getElementById("retryBtn").addEventListener("click", retryCallback);
}
