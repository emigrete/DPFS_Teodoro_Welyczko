const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📌 Asegurar que la carpeta `public/images/products/` existe antes de guardar imágenes
const uploadDir = path.join(__dirname, "../public/images/products");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("📂 Guardando en:", uploadDir); // ✅ Esto mostrará la ruta en la terminal
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname);
        console.log("📸 Nombre de archivo generado:", filename); // ✅ Verifica el nombre
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;
