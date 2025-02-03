const db = require("../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
            const limit = 10; // Cantidad de resultados por página
            const offset = (page - 1) * limit; // Calcular desde qué registro empezar

            const { count, rows: users } = await db.User.findAndCountAll({
                attributes: ["id", "firstName", "lastName", "email"],
                limit,
                offset
            });

            const totalPages = Math.ceil(count / limit);

            res.json({
                count,
                totalPages,
                currentPage: page,
                users: users.map(user => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    detail: `/api/users/${user.id}`
                })),
                next: page < totalPages ? `/api/users?page=${page + 1}` : null,
                previous: page > 1 ? `/api/users?page=${page - 1}` : null
            });
        } catch (error) {
            console.error("❌ Error en la API de usuarios:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id, {
                attributes: ["id", "firstName", "lastName", "email", "image"]
            });

            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                image: `/images/users/${user.image}`
            });
        } catch (error) {
            console.error("❌ Error en la API de usuarios:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
};
