# Lab5_Web_MiniBlog

## Descripción

Este proyecto consiste en el desarrollo de una aplicación web tipo Mini Blog / Bulletin Board, en la cual se integran conceptos de:

- Manipulación del DOM
- Consumo de APIs REST
- Manejo de eventos en JavaScript
- Implementación de UI States

La aplicación permite visualizar, buscar y crear publicaciones utilizando la API pública de DummyJSON.

---

## Funcionalidades

### Listar posts
- Se muestran publicaciones obtenidas desde la API.
- Se renderizan en formato de lista de tarjetas.

### Buscar posts
- Permite buscar publicaciones por texto.
- Se utiliza query params en la API.
- Muestra resultados, estado vacío o error.

### Crear post
- Formulario para crear nuevas publicaciones.
- Se envían datos mediante método POST.
- El nuevo post se agrega dinámicamente a la lista.

---

## UI States implementados

La aplicación maneja correctamente los siguientes estados:

- Idle: Estado inicial antes de cargar datos
- Loading: Mientras se obtienen los datos de la API
- Success: Cuando los datos se cargan correctamente
- Empty: Cuando no hay resultados
- Error: Cuando ocurre un fallo (incluye botón de retry)

---

## API utilizada

Se utilizó la API pública:

https://dummyjson.com/docs/posts

### Endpoints usados:

- GET /posts → Obtener lista de posts  
- GET /posts/search?q= → Buscar posts  
- POST /posts/add → Crear post  

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API

No se utilizaron frameworks ni librerías externas.

---

## Estructura del proyecto


## Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
```


2. Abrir el proyecto en un editor de código (por ejemplo, VS Code)

3. Ejecutar el proyecto:
- Abrir index.html en el navegador  
o  
- Usar Live Server (recomendado)

---

## Deploy

El proyecto fue publicado usando GitHub Pages:

https://marcec21.github.io/Lab5_Web_MiniBlog/ 

---

## Capturas de pantalla



---

## Video demostrativo



---

