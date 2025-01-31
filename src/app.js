const express = require("express");
const path = require("path");

const app = express();

// Configurar Express para servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Importar rutas
const mainRoutes = require("./routes/mainRoutes");

// Usar las rutas en la aplicación
app.use("/", mainRoutes);

// Configurar el puerto y levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
