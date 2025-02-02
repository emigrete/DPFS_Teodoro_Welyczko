const db = require("../database/models");

module.exports = async (req, res, next) => {
    if (!req.session.user && req.cookies.userEmail) {
        console.log("🔄 Buscando usuario en DB:", req.cookies.userEmail);

        try {
            const user = await db.User.findOne({ where: { email: req.cookies.userEmail } });

            if (user) {
                console.log("✅ Usuario encontrado en DB, iniciando sesión automáticamente:", user.email);
                req.session.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    image: user.image
                };
            } else {
                console.log("❌ Usuario no encontrado en DB, eliminando cookie.");
                res.clearCookie("userEmail");
            }
        } catch (error) {
            console.error("❌ Error al buscar usuario en DB:", error);
        }
    }
    next();
};
