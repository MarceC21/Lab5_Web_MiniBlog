// Lógica de la API para consumir los endpoints de posts
// Documentación: https://dummyjson.com/docs/posts

const BASE_URL = "https://dummyjson.com/posts";

// Obtener lista de posts
export async function getPosts() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los posts");
    }

    return response.json();
}

// Buscar posts por texto
export async function searchPosts(query) {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error("Error al buscar posts");
    }

    return response.json();
}

// Agregar un post
export async function addPost(postData) {
    const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error("Error al crear el post");
    }

    return response.json();
}



//Funciones extra que pueden ser útiles
// Eliminar post
export async function deletePost(postId) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'DELETE',
    });
    return response.json();
}

// Obtener lista de tags
export async function getPostsTagList() {
    const response = await fetch(`${BASE_URL}/tag-list`);
    return response.json();
}

// Obtener posts por tag
export async function getPostsByTag(tag) {
    const response = await fetch(`${BASE_URL}/tag/${tag}`);
    return response.json();
}