const express = require("express");
const path = require("path");
const session = require("express-session");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const rememberMiddleware = require("./middlewares/rememberMiddleware");

const app = express();

// 📌 Middleware de cookies y sesiones
app.use(cookieParser());
app.use(session({
    secret: "mi-secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } // 🔹 Sesión expira en 30 min
}));

// 📌 Middleware para recordar usuario SIEMPRE después de configurar la sesión
app.use(rememberMiddleware);

// 📌 Middleware para hacer que `user` esté disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// 📌 Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 📌 Configurar `multer` para manejar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "products"; // 📂 Carpeta por defecto
        if (req.originalUrl.includes("register")) folder = "users";
        cb(null, path.join(__dirname, `public/images/${folder}`));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 🔹 Nombre único
    }
});
const upload = multer({ storage });

// 📌 Configuración del motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 📌 Middleware para servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, "public")));

// 📌 Importar rutas
const mainRoutes = require("./routes/mainRoutes");

// 📌 Usar las rutas
app.use("/", mainRoutes);

// 📌 Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
