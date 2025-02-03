const db = require("../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const { count, rows: products } = await db.Product.findAndCountAll({
                attributes: ["id", "name", "description", "categoryId"],
                include: [{ model: db.Category, as: "category", attributes: ["name"] }],
                limit,
                offset
            });

            const totalPages = Math.ceil(count / limit);

            const countByCategory = {};
            products.forEach(product => {
                const category = product.category ? product.category.name : "Sin categoría";
                countByCategory[category] = (countByCategory[category] || 0) + 1;
            });

            res.json({
                count,
                totalPages,
                currentPage: page,
                countByCategory,
                products: products.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.category ? product.category.name : "Sin categoría",
                    detail: `/api/products/${product.id}`
                })),
                next: page < totalPages ? `/api/products?page=${page + 1}` : null,
                previous: page > 1 ? `/api/products?page=${page - 1}` : null
            });
        } catch (error) {
            console.error("❌ Error en la API de productos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                attributes: ["id", "name", "description", "price", "image"],
                include: [{ model: db.Category, as: "category", attributes: ["name"] }]
            });
    
            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
    
            res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category ? product.category.name : "Sin categoría",
                image: product.image ? `/images/products/${product.image}` : null // ✅ Evita imágenes vacías o undefined
            });
        } catch (error) {
            console.error("❌ Error en la API de productos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
    last: async (req, res) => {
        try {
            const product = await db.Product.findOne({
                order: [["createdAt", "DESC"]], // Ordenamos por fecha de creación
                attributes: ["id", "name", "description", "price", "createdAt"], // ✅ No traemos la imagen
                include: [{ model: db.Category, as: "category", attributes: ["name"] }]
            });
    
            if (!product) {
                console.warn("⚠️ No se encontró un producto en la base de datos.");
                return res.status(404).json({ error: "Producto no encontrado" });
            }
    
            console.log("✅ Último producto encontrado:", product);
    
            res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category ? product.category.name : "Sin categoría",
                createdAt: product.createdAt
            });
        } catch (error) {
            console.error("❌ Error en la API de último producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }
    
    
};

