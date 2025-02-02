const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getUploadPath = (folder) => {
    const uploadPath = path.join(__dirname, `../public/images/${folder}`);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    return uploadPath;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "products"; // Por defecto, guarda en productos
        if (req.originalUrl.includes("register")) folder = "users";
        cb(null, getUploadPath(folder));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
