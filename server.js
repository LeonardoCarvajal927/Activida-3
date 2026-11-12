
 // Servidor
import express from "express";

const app = express();

app.use(express.json());


let productos = [
    { id: 1, nombre: "Teclado", precio: 89990, stock: 10 },
    { id: 2, nombre: "Mouse", precio: 31990, stock: 25 }
];

let siguienteId = 3;


app.get("/productos", (req, res) => {

    res.status(200).json(productos);

});


app.get("/productos/:id", (req, res) => {

    let id = Number(req.params.id);

    let producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.status(200).json(producto);

});


app.post("/productos", (req, res) => {

    if (!req.body) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del producto"
        });
    }

    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let stock = req.body.stock;

    if (typeof nombre !== "string" || nombre.trim() === "" ||
        typeof precio !== "number" || !Number.isFinite(precio) || precio < 0 ||
        typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {

        return res.status(400).json({
            mensaje: "Datos del producto no validos"
        });
    }

    let nuevoProducto = {
        id: siguienteId,
        nombre: nombre,
        precio: precio,
        stock: stock
    };

    productos.push(nuevoProducto);

    siguienteId++;

    res.status(201).json(nuevoProducto);

});


app.put("/productos/:id", (req, res) => {

    let id = Number(req.params.id);

    let producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    if (!req.body) {
        return res.status(400).json({
            mensaje: "Debes enviar los datos del producto"
        });
    }

    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let stock = req.body.stock;

    if (typeof nombre !== "string" || nombre.trim() === "" ||
        typeof precio !== "number" || !Number.isFinite(precio) || precio < 0 ||
        typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {

        return res.status(400).json({
            mensaje: "Datos del producto no validos"
        });
    }

    producto.nombre = nombre;
    producto.precio = precio;
    producto.stock = stock;

    res.status(200).json(producto);

});


app.patch("/productos/:id", (req, res) => {

    let id = Number(req.params.id);

    let producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            mensaje: "Debes enviar datos para modificar"
        });
    }

    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let stock = req.body.stock;

    if (nombre !== undefined) {
        if (typeof nombre !== "string" || nombre.trim() === "") {
            return res.status(400).json({
                mensaje: "Datos del producto no validos"
            });
        }
    }

    if (precio !== undefined) {
        if (typeof precio !== "number" || !Number.isFinite(precio) || precio < 0) {
            return res.status(400).json({
                mensaje: "Datos del producto no validos"
            });
        }
    }

    if (stock !== undefined) {
        if (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({
                mensaje: "Datos del producto no validos"
            });
        }
    }

    if (nombre === undefined && precio === undefined && stock === undefined) {
        return res.status(400).json({
            mensaje: "No se enviaron campos validos"
        });
    }

    if (nombre !== undefined) {
        producto.nombre = nombre;
    }

    if (precio !== undefined) {
        producto.precio = precio;
    }

    if (stock !== undefined) {
        producto.stock = stock;
    }

    res.status(200).json(producto);

});


app.delete("/productos/:id", (req, res) => {

    let id = Number(req.params.id);

    let producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    productos = productos.filter(p => p.id !== id);

    res.status(204).send();

});



app.listen(3000, () => {
    console.log("Servidor listo");
});
