const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

const getUsers = () => {
    try {
        const fileContent = fs.readFileSync(usersFilePath, "utf-8");
        return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
        console.log("⚠️ Error al leer users.json:", error);
        return [];
    }
};

module.exports = (req, res, next) => {
    if (!req.session.user && req.cookies.userEmail) {
        console.log("🔄 Buscando usuario en cookies:", req.cookies.userEmail);

        const users = getUsers();
        console.log("📂 Usuarios cargados desde JSON:", users.length);

        const user = users.find(u => u.email === decodeURIComponent(req.cookies.userEmail));

        if (user) {
            console.log("✅ Usuario encontrado, iniciando sesión automáticamente:", user.email);
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "user",
                image: user.image || "default.jpg"
            };
        } else {
            console.log("❌ Usuario no encontrado en JSON, eliminando cookie.");
            res.clearCookie("userEmail");
        }
    }
    next();
};
