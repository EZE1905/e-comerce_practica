//* PRODUCTOS
const productos = [
    {
        id: "auris 01",
        titulo: "auris 01",
        imagen: "./img/auris 01.jpg",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares",
        },
        precio: 6000,
    },
    {
        id: "auris 02",
        titulo: "auris 02",
        imagen: "./img/auris 02.jpg",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares",
        },
        precio: 6000,
    },
    {
        id: "auris 03",
        titulo: "auris 03",
        imagen: "./img/auris 03.jpg",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares",
        },
        precio: 6000,
    },
    {
        id: "auris 04",
        titulo: "auris 04",
        imagen: "./img/auris 04.webp",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares",
        },
        precio: 6000,
    },
    {
        id: "auris 05",
        titulo: "auris 05",
        imagen: "./img/auris 05.jpg",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares",
        },
        precio: 6000,
    },
    {
        id: "auris 06",
        titulo: "auris 06",
        imagen: "./img/auris 06.jpg",
        categoria: {
            nombre: "Auriculares",
            id: "auriculares",
        },
        precio: 6000,
    },
    {
        id: "mouse 01",
        titulo: "mouse 01",
        imagen: "./img/mouse 01.jpg",
        categoria: {
            nombre: "Mouse",
            id: "mouse",
        },
        precio: 6000,
    },
    {
        id: "mouse 02",
        titulo: "mouse 02",
        imagen: "./img/mouse 02.webp",
        categoria: {
            nombre: "Mouse",
            id: "mouse",
        },
        precio: 6000,
    },
    {
        id: "mouse 03",
        titulo: "mouse 03",
        imagen: "./img/mouse 03.jpg",
        categoria: {
            nombre: "Mouse",
            id: "mouse",
        },
        precio: 6000,
    },
    {
        id: "mouse 04",
        titulo: "mouse 04",
        imagen: "./img/mouse 04.jpg",
        categoria: {
            nombre: "Mouse",
            id: "mouse",
        },
        precio: 6000,
    },
    {
        id: "mouse 05",
        titulo: "mouse 05",
        imagen: "./img/mouse 05.jpg",
        categoria: {
            nombre: "Mouse",
            id: "mouse",
        },
        precio: 6000,
    },
    {
        id: "mouse 06",
        titulo: "mouse 06",
        imagen: "./img/mouse 06.webp",
        categoria: {
            nombre: "Mouse",
            id: "mouse",
        },
        precio: 6000,
    },
    {
        id: "teclado 01",
        titulo: "teclado 01",
        imagen: "./img/teclado 01.jpg",
        categoria: {
            nombre: "Teclado",
            id: "teclado",
        },
        precio: 6000,
    },
    {
        id: "teclado 02",
        titulo: "teclado 02",
        imagen: "./img/teclado 02.jpg",
        categoria: {
            nombre: "Teclado",
            id: "teclado",
        },
        precio: 6000,
    },
    {
        id: "teclado 03",
        titulo: "teclado 03",
        imagen: "./img/teclado 03.jpg",
        categoria: {
            nombre: "Teclado",
            id: "teclado",
        },
        precio: 6000,
    },
    {
        id: "teclado 04",
        titulo: "teclado 04",
        imagen: "./img/teclado 04.jpg",
        categoria: {
            nombre: "Teclado",
            id: "teclado",
        },
        precio: 6000,
    },
    {
        id: "teclado 05",
        titulo: "teclado 05",
        imagen: "./img/teclado 05.webp",
        categoria: {
            nombre: "Teclado",
            id: "teclado",
        },
        precio: 6000,
    },
    {
        id: "teclado 06",
        titulo: "teclado 06",
        imagen: "./img/teclado 06.webp",
        categoria: {
            nombre: "Teclado",
            id: "teclado",
        },
        precio: 6000,
    },
]

//* VARIABLES
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const botonesagregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito")

//* FUNCIONES
function cargarProductos(productosElegidos){
    
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class:"producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);

    })

    actualizarbotonesagregar()
}

cargarProductos(productos)

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => {boton.classList.remove("active")})
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton)
        }else{
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos)
        }
        
    })
})

function actualizarbotonesagregar(){
    const botonesagregar = document.querySelectorAll(".producto-agregar")

    botonesagregar.forEach(boton => {
        boton.addEventListener("click", agregaralcarrito)
    })
} 

let productosencarrito
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if(productosEnCarritoLS){
    productosencarrito = JSON.parse(productosEnCarritoLS)
    actualizarnumerito()
}else{
    productosencarrito = []
}

function agregaralcarrito(e){
    const idboton = e.currentTarget.id
    const productoagregado = productos.find(producto => producto.id === idboton)

    if(productosencarrito.some(producto => producto.id === idboton)){

        const index = productosencarrito.findIndex(producto => producto.id === idboton)

        productosencarrito[index].cantidad++

    }else{
        productoagregado.cantidad = 1
        productosencarrito.push(productoagregado)
    }

    actualizarnumerito ()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosencarrito))
}

function actualizarnumerito (){
    let nuevonumerito = productosencarrito.reduce((acc, producto) => acc + producto.cantidad, 0)

    numerito.innerText = nuevonumerito
}

