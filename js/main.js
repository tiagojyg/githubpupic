let productos = [];
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Cargar productos desde el JSON
fetch("js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
    });

// Event listeners para botones de categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        // Remover clase active de todos los botones
        botonesCategorias.forEach(btn => btn.classList.remove("active"));
        // Agregar clase active al botón clickeado
        e.currentTarget.classList.add("active");
        
        // Filtrar productos según categoría
        const categoriaSeleccionada = e.currentTarget.id;
        
        if (categoriaSeleccionada !== "todos") {
            const productosCategoria = productos.filter(producto => producto.categoria.id === categoriaSeleccionada);
            tituloPrincipal.innerText = e.currentTarget.innerText;
            cargarProductos(productosCategoria);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

// Función para cargar productos en el DOM
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    
    actualizarBotonesAgregar();
}

// Actualizar event listeners de botones agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Obtener productos del carrito desde localStorage
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = productosEnCarrito ? JSON.parse(productosEnCarrito) : [];

// Función para agregar producto al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        // Si el producto no está, agregarlo con cantidad 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();
    
    // Guardar en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    // Feedback visual
    e.currentTarget.innerText = "Agregado!";
    setTimeout(() => {
        e.currentTarget.innerText = "Agregar";
    }, 500);
}

// Actualizar el número del carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}