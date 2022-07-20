class Producto{
    constructor (id, nombre, imagen, precio){
    this.id  = id
    this.nombre = nombre
    this.imagen = imagen
    this.precio = precio
    }
}

class Carrito {
    constructor (id){
        this.id = id
        this.productos = []
    }
    calcularTotal() {
        let total = 0 
        for(let i = 0; i < this.productos.length; i++){
            total = total + this.productos[i].precio
        }
        return total        
    }
}


function renderCard (producto) {
    let cardRendered = `
    <div class="card m-3" style="width: 18rem;">
        <img src="./images/${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.id}.${producto.nombre}</h5>
            <p class="card-text">$${producto.precio}</p>
        <a href="#" class="btn btn-primary botonDeCompra" id="${producto.id}">Agregar al carrito</a>
        </div>
    </div>
    `
    return cardRendered
}



function limpiarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    divCarrito.innerHTML =""
}

function actualizarCarrito(carrito) {
    let divCarrito = document.querySelector("#carrito")
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += renderCard(producto)
    })
    divCarrito.innerHTML += `<h1>Precio Total: $${carrito.calcularTotal()}</h1>`
}

function renovarStorage () {
    localStorage.removeItem("carrito")
    localStorage.setItem ("carrito", JSON.stringify( carrito))
}

/* cargar carrito existente*/
window.addEventListener("DOMContentLoaded", (e) => {
    let storage = JSON.parse(localStorage.getItem ("carrito"))
    let carritoGuardado = new Carrito(storage.id, storage.productos)
    storage.productos.forEach(producto => {
        carritoGuardado.productos.push(producto)
    })
    console.log(carritoGuardado)
    
    limpiarCarrito()
    actualizarCarrito(carritoGuardado)
})



let catalogoProductos = []
let producto1 = new Producto (1, "Aire Acondicionado", "imagenAire.jpg", 110000)
let producto2 = new Producto (2, "Calefactor", "imagenCalefactor.jpg", 50000)
let producto3 = new Producto (3, "Heladera", "imagenHeladera.jpg", 90000)
let producto4 = new Producto (4, "Lavavajillas", "imagenLavavajillas.jpg", 150000)

const producto1Nuevo = {
    ...producto1,
    precio: 130000
}
console.log(producto1Nuevo)
const producto2Nuevo = {
    ...producto2,
    precio: 60000
}
console.log(producto2Nuevo)
const producto3Nuevo = {
    ...producto3,
    precio: 100000
}
console.log(producto3Nuevo)
const producto4Nuevo = {
    ...producto4,
    precio: 160000
}
console.log(producto4Nuevo)





catalogoProductos.push(producto1)
catalogoProductos.push(producto2)
catalogoProductos.push(producto3)
catalogoProductos.push(producto4)





let cardsDiv = document.querySelector ("#cards")

catalogoProductos.forEach(producto => {
    cardsDiv.innerHTML += renderCard (producto)
})


let carrito = new Carrito(1)

let botones = document.querySelectorAll(".botonDeCompra")
let arrayDeBotones = Array.from(botones)
arrayDeBotones.forEach(boton => {
    boton.addEventListener ("click", (e) => {
        console.log(e.target.id)
        let productoSeleccionado = catalogoProductos.find(producto => producto.id == e.target.id)
        console.log(productoSeleccionado)
        carrito.productos.push(productoSeleccionado)
        console.log (carrito)
        console.log(carrito.calcularTotal())
        limpiarCarrito()
        actualizarCarrito(carrito)
        renovarStorage()
    })
})