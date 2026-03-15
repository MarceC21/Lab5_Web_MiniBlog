// Importar funciones de la API
import { getPosts, searchPosts, addPost } from "./api.js";

// Importar UI states
import { renderIdle, renderLoading, renderSuccess, renderEmpty, renderError } from "./ui.js";


// Referencias al DOM
const form = document.querySelector("#postForm");

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

const newPostBtn = document.querySelector("#newPostBtn");
const formContainer = document.querySelector("#formContainer");

// Estados de UI
const postStatusEl = document.querySelector("#postStatus");
const searchStatusEl = document.querySelector("#searchStatus");


// Lista de posts obtenidos de la API
let posts = [];


//Función para mostrar el formulario de creación de posts al hacer click en el botón "Nuevo post"
newPostBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
    postStatusEl.textContent = "Estado: escribiendo post...";
});



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


// Función para manejar el envío del formulario de creación de posts
form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const title = form.elements["title"].value;
  const content = form.elements["content"].value;

  const nuevoPost = {
    title: title,
    body: content,
    userId: 1
  };

  try {

    postStatusEl.textContent = "Estado: publicando...";

    const createdPost = await addPost(nuevoPost);

    posts.unshift(createdPost);

    renderPosts(posts);

    form.reset();

    console.log("Nuevo post creado:", createdPost);

    formContainer.style.display = "none";

    postStatusEl.textContent = "Estado: esperando publicación...";
    

  } catch (error) {

    console.error("Error al crear el post:", error);

    postStatusEl.textContent = "Estado: error al publicar";

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

    try {

        const data = await searchPosts(query);
        const results = data.posts;

        if (results.length === 0) {
            searchStatusEl.textContent = "Estado: no se encontraron resultados";
            renderPosts([]);
            return;
        }

        renderPosts(results);

        searchStatusEl.textContent = `Estado: ${results.length} resultado(s) encontrados`;

    } catch (error) {

        console.error("Error al buscar posts:", error);
        searchStatusEl.textContent = "Estado: error al buscar";

    }

});

//Función extra para permitir buscar al presionar Enter en el input de búsqueda :S
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});


renderIdle();
loadPosts();