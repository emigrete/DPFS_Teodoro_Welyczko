const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/adminMiddleware");
const productsController = require("../controllers/productsController");
const upload = require("../middlewares/upload");
const usersRoutes = require("./usersRoutes");
const authMiddleware = require("../middlewares/authMiddleware");

// 📌 Protección de perfil (Solo usuarios logueados pueden acceder)
router.get("/profile", authMiddleware, (req, res) => {
    res.render("users/profile", { user: req.session.user });
});

// 📌 Rutas de usuarios
router.use("/", usersRoutes);

// 📌 Middleware de sesión (Para que `user` esté disponible en todas las vistas)
router.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// 📌 Página de inicio
router.get("/", productsController.home);

// 📌 Rutas de productos
router.get("/products", productsController.list);
router.get("/products/create", isAdmin, productsController.createForm);
router.post("/products/create", isAdmin, upload.single("image"), productsController.create);
router.get("/products/:id/edit", isAdmin, productsController.editForm);
router.post("/products/update/:id", isAdmin, upload.single("image"), productsController.update);  // ✅ RUTA CORREGIDA
router.post("/products/:id/delete", isAdmin, productsController.delete);
router.get("/products/filter", productsController.filter);
router.get("/products/search", productsController.search);
router.get("/products/:id", productsController.detail);

// 📌 Rutas para destacar y aplicar descuentos a productos (solo Admins)
router.post("/products/:id/toggle-featured", isAdmin, productsController.toggleFeatured);
router.post("/products/:id/toggle-discount", isAdmin, productsController.toggleDiscount);

// 📌 Cerrar sesión
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
