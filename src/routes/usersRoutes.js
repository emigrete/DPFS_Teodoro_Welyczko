const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const upload = require("../middlewares/upload");
const validateRegister = require("../middlewares/validateRegister");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// 📌 Rutas solo para huéspedes (usuarios NO logueados)
router.get("/register", guestMiddleware, usersController.registerForm);
router.post("/register", guestMiddleware, upload.single("image"), validateRegister, usersController.register);
router.get("/login", guestMiddleware, usersController.loginForm);
router.post("/login", guestMiddleware, usersController.login);

// 📌 Ruta protegida: Solo para usuarios logueados
router.get("/profile", authMiddleware, usersController.profile);

// 📌 Logout (cualquiera puede salir)
router.get("/logout", usersController.logout);

module.exports = router;

