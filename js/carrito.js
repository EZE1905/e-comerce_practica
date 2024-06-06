let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprado = document.querySelector("#carrito-acciones-comprar")

// Función para cargar los productos en el carrito
function cargarProductosCarritos() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.cantidad * producto.precio}</p>
                </div>
                <div class="carrito-producto-eliminar">
                    <button data-id="${producto.id}" class="boton-eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;

            contenedorCarritoProductos.append(div);
        });
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

// Función para actualizar los eventos de los botones de eliminación
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".boton-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    // Obtener el id del producto del atributo data-id del botón
    const idProducto = e.currentTarget.getAttribute('data-id');

    // Encontrar el índice del producto en el array cuyo id coincide con idProducto
    const index = productosEnCarrito.findIndex(producto => producto.id === idProducto);

    // Verificar si el producto fue encontrado (índice diferente de -1)
    if (index !== -1) {
        // Eliminar el producto del array productosEnCarrito
        productosEnCarrito.splice(index, 1);

        // Recargar los productos en el carrito
        cargarProductosCarritos();

        // Actualizar el carrito en el localStorage
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    } else {
        console.error(`Producto con id ${idProducto} no encontrado en el carrito.`);
    }
}

// Inicializar el carrito al cargar la página
cargarProductosCarritos();


botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){

    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))

    cargarProductosCarritos()

}

function actualizarTotal(){

    const totalCalculado = productosEnCarrito.reduce((acc,producto) => acc + (producto.cantidad * producto.precio), 0)
    total.innerText = `$${totalCalculado}`

}


botonComprado.addEventListener("click", comprarCarrito)

function comprarCarrito(){

    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}