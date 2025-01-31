const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getUploadPath = (type) => {
    const uploadPath = path.join(__dirname, `../public/images/${type}`);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.body.type || "products"; // Usa "products" por defecto
        cb(null, getUploadPath(type));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
