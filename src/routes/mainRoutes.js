const express = require("express");
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');

// 🔹 Middleware para manejar sesiones
router.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Pasar usuario a todas las vistas
    next();
});

// 🏠 Página de inicio
router.get("/", (req, res) => {
    res.render("home", { title: "Inicio - ETECH" });
});

// 🛒 Carrito de compras
router.get("/cart", (req, res) => {
    let cart = [
        { id: 1, name: "Laptop Gamer", price: 1200, image: "laptop.jpg" },
        { id: 2, name: "Teclado Mecánico", price: 150, image: "teclado.jpg" },
        { id: 3, name: "Mouse Inalámbrico", price: 50, image: "mouse.jpg" }
    ];
    res.render("products/productCart", { title: "Carrito - ETECH", cart });
});

// 🛍 Listado de productos
router.get("/products/:id", (req, res) => {
    let products = [
        { id: 1, name: "Laptop Gamer", description: "Potente laptop para gaming y trabajo", price: 1200, image: "laptop.jpg" },
        { id: 2, name: "Teclado Mecánico", description: "Teclado RGB con switches mecánicos", price: 150, image: "teclado.jpg" },
        { id: 3, name: "Mouse Inalámbrico", description: "Mouse ergonómico y preciso", price: 50, image: "mouse.jpg" }
    ];

    let product = products.find(p => p.id == req.params.id);
    
    if (!product) {
        return res.status(404).send("Producto no encontrado");
    }

    res.render("products/productDetail", { title: product.name, product });
});

// Todos los productos 

router.get("/products", (req, res) => {

    let products = [
        { id: 1, name: "Laptop Gamer", description: "Potente laptop para gaming y trabajo", price: 1200, image: "laptop.jpg" },
        { id: 2, name: "Teclado Mecánico", description: "Teclado RGB con switches mecánicos", price: 150, image: "teclado.jpg" },
        { id: 3, name: "Mouse Inalámbrico", description: "Mouse ergonómico y preciso", price: 50, image: "mouse.jpg" }
    ];

    res.render("products/allProducts", { title: "Todos los productos", products });


});

// 🛠 CREAR PRODUCTO (Solo Admins)
router.get("/product/create", isAdmin, (req, res) => {
    res.render("products/createProduct", { title: "Crear Producto - ETECH" });
});

router.post("/products/create", isAdmin, (req, res) => {
    console.log(req.body); 
    res.send("Producto creado con éxito (esto es temporal)");
});

// ✏️ EDITAR PRODUCTO (Solo Admins)
router.get("/edit/:id", isAdmin, (req, res) => {
    let product = { 
        id: req.params.id, 
        name: "Laptop Gamer", 
        description: "Laptop potente para juegos y trabajo", 
        price: 1200, 
        category: "Electrónica",
        color: "Negro",
        image: "default.jpg"
    };

    res.render("products/editProduct", { title: "Editar Producto", product });
});

router.post("/edit/:id", isAdmin, (req, res) => {
    console.log(req.body);
    res.send(`Producto con ID ${req.params.id} actualizado`);
});

// 🔑 AUTENTICACIÓN (Login y Registro)
router.get("/register", (req, res) => {
    res.render("users/register", { title: "Registro - ETECH" });
});

router.get("/login", (req, res) => {
    res.render("users/login", { title: "Iniciar Sesión - ETECH" });
});

router.post("/login", (req, res) => {
    let users = [
        { id: 1, firstName: "Admin", email: "admin@etech.com", password: "1234", role: "admin" },
        { id: 2, firstName: "User", email: "user@etech.com", password: "1234", role: "user" }
    ];

    let user = users.find(u => u.email === req.body.email && u.password === req.body.password);

    if (user) {
        req.session.user = user; // Guardar usuario en sesión
        res.redirect("/");  // Redirigir a la home
    } else {
        res.send("Credenciales incorrectas");  // Mensaje si el login falla
    }
});

// 🚪 Cerrar sesión
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;


