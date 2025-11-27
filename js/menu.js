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
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const abrirMenu = document.getElementById('abrir-menu');
    const cerrarMenu = document.getElementById('cerrar-menu');
    const botonesCategoria = document.querySelectorAll('.boton-categoria');
    const botonCarrito = document.querySelector('.boton-carrito');

    // Función para alternar la visibilidad del menú
    const toggleMenu = () => {
        nav.classList.toggle('nav-visible');
    };

    // Eventos para abrir y cerrar
    if (abrirMenu) {
        abrirMenu.addEventListener('click', toggleMenu);
    }
    if (cerrarMenu) {
        cerrarMenu.addEventListener('click', toggleMenu);
    }

    // Cerrar el menú después de hacer click en una categoría o en el carrito (solo en móviles)
    const cerrarMenuDespuesDeClick = (e) => {
        // e.target.closest('.izquierda') asegura que el click fue dentro del NAV
        if (window.innerWidth <= 850 && nav.classList.contains('nav-visible')) {
            // Un pequeño retraso para permitir la navegación o acción
            setTimeout(() => {
                nav.classList.remove('nav-visible');
            }, 300);
        }
    };
    
    botonesCategoria.forEach(button => {
        button.addEventListener('click', cerrarMenuDespuesDeClick);
    });
    
    if (botonCarrito) {
        botonCarrito.addEventListener('click', cerrarMenuDespuesDeClick);
    }
});
