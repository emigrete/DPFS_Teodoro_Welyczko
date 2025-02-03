const express = require("express");
const router = express.Router();

// Importamos los controladores
const usersAPIController = require("../controllers/usersAPIController");
const productsAPIController = require("../controllers/productsAPIController");

router.get("/products/last", productsAPIController.last);

// 📌 Rutas para la API de usuarios
router.get("/users", usersAPIController.list); // Listado de usuarios
router.get("/users/:id", usersAPIController.detail); // Detalle de un usuario

// 📌 Rutas para la API de productos
router.get("/products", productsAPIController.list); // Listado de productos
router.get("/products/:id", productsAPIController.detail); // Detalle de un producto



module.exports = router;
