// Lógica principal: manejo de eventos, llamadas a la API, render.
 
import { getPosts, searchPosts, addPost } from "./api.js";
import { renderIdle, renderLoading, renderSuccess, renderEmpty, renderError } from "./ui.js";
 
// Referencias al DOM
const form          = document.querySelector("#postForm");
const searchInput   = document.querySelector("#searchInput");
const searchButton  = document.querySelector("#searchButton");
const newPostBtn    = document.querySelector("#newPostBtn");
const formContainer = document.querySelector("#formContainer");
const postStatusEl  = document.querySelector("#postStatus");
const searchStatusEl = document.querySelector("#searchStatus");
 
// Cache de posts cargados
let posts = [];
 
// Funcion para mostrar/ocultar el formulario de nuevo post y actualizar el estado
newPostBtn.addEventListener("click", () => {
    formContainer.classList.toggle("activo");
    postStatusEl.textContent = formContainer.classList.contains("activo")
        ? "Estado: escribiendo post..."
        : "Estado: esperando envío…";
});
 
// Render de los posts 
function renderPosts(list) {
    if (list.length === 0) {
        renderEmpty();
        return;
    }
 
    const postsHTML = list.map(post => {
        const tagsHTML = (post.tags || [])
            .map(t => `<span class="post-tag">${t}</span>`)
            .join("");
 
        return `
            <li class="post-card">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                ${tagsHTML ? `<div class="post-tags">${tagsHTML}</div>` : ""}
            </li>
        `;
    }).join("");
 
    renderSuccess(postsHTML);
}
 
// Carga inicial
async function loadPosts() {
    renderLoading();
    try {
        const data = await getPosts();
        posts = data.posts;
        renderPosts(posts);
    } catch (error) {
        console.error("Error al cargar los posts:", error);
        renderError(loadPosts);
    }
}
 
// Función para manejar el envío del formulario de nuevo post
form.addEventListener("submit", async (event) => {
    event.preventDefault();
 
    const title   = form.elements["title"].value.trim();
    const content = form.elements["content"].value.trim();
 
    if (!title || !content) return;
 
    const nuevoPost = { title, body: content, userId: 1 };
 
    try {
        postStatusEl.textContent = "Estado: publicando...";
        const createdPost = await addPost(nuevoPost);
 
        posts.unshift(createdPost);
        renderPosts(posts);
 
        form.reset();
        formContainer.classList.remove("activo");
        postStatusEl.textContent = "Estado: ¡post publicado con éxito!";
 
        setTimeout(() => {
            postStatusEl.textContent = "Estado: esperando envío…";
        }, 3000);
 
    } catch (error) {
        console.error("Error al crear el post:", error);
        postStatusEl.textContent = "Estado: error al publicar. Intenta de nuevo.";
    }
});
 
// Función para manejar la búsqueda de posts
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
 
    if (query === "") {
        renderPosts(posts);
        searchStatusEl.textContent = "Estado: mostrando todos los posts";
        return;
    }
 
    searchStatusEl.textContent = "Estado: buscando...";
    renderLoading();
 
    try {
        const data = await searchPosts(query);
        const results = data.posts;
 
        renderPosts(results);
 
        searchStatusEl.textContent = results.length === 0
            ? "Estado: sin resultados"
            : `Estado: ${results.length} resultado(s) encontrado(s)`;
 
    } catch (error) {
        console.error("Error al buscar posts:", error);
        searchStatusEl.textContent = "Estado: error al buscar";
        renderError(() => searchButton.click());
    }
});
 

// Esta es una funcion extra para buscar con Enter :S
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchButton.click();
});
 
// Inicio 
renderIdle();
loadPosts();