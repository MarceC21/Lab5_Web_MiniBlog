// Importar funciones de la API
import { getPosts, searchPosts, addPost } from "./api.js";

// Importar UI states
import { renderIdle, renderLoading, renderSuccess, renderEmpty, renderError } from "./ui.js";


// Referencias al DOM
const form = document.querySelector("#postForm");

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

// Estados de UI
const postStatusEl = document.querySelector("#postStatus");
const searchStatusEl = document.querySelector("#searchStatus");


// Lista de posts obtenidos de la API
let posts = [];


// Función para renderizar los posts 
function renderPosts(posts) {

    const postsHTML = posts.map(post => `
        <li>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </li>
    `).join("");

    renderSuccess(`<ul>${postsHTML}</ul>`);
}

// Función para cargar los posts al iniciar la aplicación
async function loadPosts() {

    renderLoading();

    try {

        const data = await getPosts();

        posts = data.posts;

        if (posts.length === 0) {
            renderEmpty();
            return;
        }

        renderPosts(posts);

    } catch (error) {

        console.error("Error al cargar los posts:", error);
        renderError(loadPosts);

    }
}

renderIdle();
loadPosts();