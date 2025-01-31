const express = require("express");
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const productsController = require("../controllers/productsController");
const upload = require("../middlewares/upload"); // ✅ Importamos multer

// 🔹 Middleware para manejar sesiones
router.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// 🏠 Página de inicio
router.get("/", (req, res) => res.render("home", { title: "Inicio - ETECH" }));

// 🛒 Carrito de compras
router.get("/cart", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    let cart = [
        { id: 1, name: "Laptop Gamer", price: 1200, image: "laptop.jpg" },
        { id: 2, name: "Teclado Mecánico", price: 150, image: "teclado.jpg" },
        { id: 3, name: "Mouse Inalámbrico", price: 50, image: "mouse.jpg" }
    ];
    res.render("products/productCart", { title: "Carrito - ETECH", cart });
});

// 🛍 Listado de productos
router.get("/products", productsController.list);

// 🛠 CREAR PRODUCTO (Solo Admins)
router.get("/products/create", isAdmin, productsController.createForm);
router.post("/products/create", isAdmin, upload.single("image"), productsController.create); // ✅ Agregado `upload.single("image")`

// ✏️ EDITAR PRODUCTO (Solo Admins)
router.get("/products/:id/edit", isAdmin, productsController.editForm);
router.post("/products/:id/edit", isAdmin, upload.single("image"), productsController.update);

// 🗑 Eliminar producto (Solo Admins)
router.post("/products/:id/delete", isAdmin, productsController.delete);

// 🎨 Filtrar productos

router.get("/products/filter", productsController.filter);


// 🔍 Buscador de productos
router.get("/products/search", productsController.search);

// 🔎 Detalle de producto
router.get("/products/:id", productsController.detail);







// 🔑 AUTENTICACIÓN (Login y Registro)
router.get("/register", (req, res) => res.render("users/register", { title: "Registro - ETECH" }));
router.get("/login", (req, res) => res.render("users/login", { title: "Iniciar Sesión - ETECH" }));

router.post("/login", (req, res) => {
    let users = [
        { id: 1, firstName: "Admin", email: "admin@etech.com", password: "1234", role: "admin" },
        { id: 2, firstName: "User", email: "user@etech.com", password: "1234", role: "user" }
    ];

    let user = users.find(u => u.email === req.body.email && u.password === req.body.password);

    if (user) {
        req.session.user = user;
        res.redirect("/");
    } else {
        res.send("Credenciales incorrectas");
    }
});

// 🚪 Cerrar sesión
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
