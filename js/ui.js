// Aqui estaran todos los UI states
 
// Contenedor principal donde se renderizan los posts
const container = document.getElementById("postsContainer");
 
// Estado inicial (idle)
export function renderIdle() {
    container.innerHTML = `
        <li>
            <p>Los posts aparecerán aquí</p>
        </li>
    `;
}
 
// Estado de carga
export function renderLoading() {
    container.innerHTML = `
        <li>
            <div class="spinner"></div>
            <p>Cargando posts...</p>
        </li>
    `;
}
 
// Estado de éxito — recibe HTML de los posts
export function renderSuccess(postsHTML) {
    container.innerHTML = postsHTML;
}
 
// Estado vacío
export function renderEmpty() {
    container.innerHTML = `
        <li>
            <p>No se encontraron posts</p>
        </li>
    `;
}
 
// Estado de error con botón retry
export function renderError(retryCallback) {
    container.innerHTML = `
        <li>
            <p>Ocurrió un error al cargar los posts.</p>
            <button id="retryBtn">Reintentar</button>
        </li>
    `;
    document.getElementById("retryBtn").addEventListener("click", retryCallback);
}