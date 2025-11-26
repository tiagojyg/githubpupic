// Elementos del menú
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside") || document.querySelector("nav");

// Abrir menú (solo si existe el botón - para móvil)
if (openMenu) {
    openMenu.addEventListener("click", () => {
        if (aside) {
            aside.classList.add("aside-visible");
        }
    });
}

// Cerrar menú (solo si existe el botón - para móvil)
if (closeMenu) {
    closeMenu.addEventListener("click", () => {
        if (aside) {
            aside.classList.remove("aside-visible");
        }
    });
}

// Cerrar menú al hacer click en cualquier botón de categoría (responsive)
// Usamos delegación de eventos para evitar conflictos
document.addEventListener("click", (e) => {
    // Si se hace click en un botón de categoría
    if (e.target.classList.contains("boton-categoria")) {
        if (aside) {
            aside.classList.remove("aside-visible");
        }
    }
    
    // Cerrar menú al hacer click fuera de él (solo en móvil)
    if (aside && openMenu) {
        if (!aside.contains(e.target) && !openMenu.contains(e.target)) {
            aside.classList.remove("aside-visible");
        }
    }
});
