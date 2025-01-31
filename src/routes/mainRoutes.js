const express = require("express");
const router = express.Router();
const path = require("path");

// Ruta para la página de inicio
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Ruta para la página de detalle de producto
router.get("/product/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/productDetail.html"));
});

// Ruta para la página del carrito
router.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/productCart.html"));
});

// Ruta para la página de registro
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
});

// Ruta para la página de login
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
