// Elementos del menú
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

// Abrir menú
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
});

// Cerrar menú
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
});

// Cerrar menú al hacer click en los botones de categoría (responsive)
const botonesCategorias = document.querySelectorAll(".boton-categoria");
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", () => {
        aside.classList.remove("aside-visible");
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener("click", (e) => {
    if (!aside.contains(e.target) && !openMenu.contains(e.target)) {
        aside.classList.remove("aside-visible");
    }
});