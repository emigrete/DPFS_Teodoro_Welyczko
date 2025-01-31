const express = require("express");
const path = require("path");
const session = require('express-session');
const multer = require("multer");


const app = express();


// Configurar `multer` para manejar archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "mi-ecommerce/src/public/images/products"); // 📂 Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Middleware para capturar datos del formulario
app.use(session({
    secret: 'secreto123',  // Clave secreta para firmar la sesión
    resave: false,
    saveUninitialized: false
}));


// Middleware para procesar formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware para manejar sesiones 
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;  // Hace que "user" esté disponible en todas las vistas
    next();
});




// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");

// Definir la carpeta de vistas
app.set("views", path.join(__dirname, "views"));

// Middleware para servir archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, "public")));

// Importar rutas
const mainRoutes = require("./routes/mainRoutes");

// Usar las rutas
app.use("/", mainRoutes);

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
