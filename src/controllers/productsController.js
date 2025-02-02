const db = require("../database/models");

const productsController = {
    
    // 🏠 Listar todos los productos
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();
            res.render("products/allProducts", { 
                title: "Todos los productos", 
                products, 
                user: req.session.user,
                category: ""
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🎨 Filtrar productos por categoría
    filter: async (req, res) => {
        try {
            let category = req.query.category ? req.query.category.trim() : "";
            if (!category) return res.redirect("/products");

            const filteredProducts = await db.Product.findAll({
                where: { categoryId: category }
            });

            res.render("products/allProducts", { 
                title: `Categoría: ${category}`, 
                products: filteredProducts, 
                user: req.session.user,
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔍 Buscar productos
    search: async (req, res) => {
        try {
            const query = req.query.query ? req.query.query.toLowerCase() : null;
            if (!query) return res.redirect("/products");

            const filteredProducts = await db.Product.findAll({
                where: db.Sequelize.or(
                    { name: { [db.Sequelize.Op.like]: `%${query}%` } },
                    { description: { [db.Sequelize.Op.like]: `%${query}%` } }
                )
            });

            res.render("products/allProducts", { 
                title: `Resultados para "${req.query.query}"`, 
                products: filteredProducts, 
                user: req.session.user,
                category: ""
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔎 Detalle de un producto
    detail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) return res.status(404).send("Producto no encontrado");

            res.render("products/productDetail", { title: product.name, product });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🛠 Mostrar formulario de creación
    createForm: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            res.render("products/createProduct", { title: "Crear Producto", categories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🆕 Crear un producto
    create: async (req, res) => {
        try {
            await db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categoryId: req.body.categoryId,
                brandId: req.body.brandId || null,
                colorId: req.body.colorId || null,
                image: req.file ? req.file.filename : "default.jpg"
            });

            res.redirect("/products");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ✏️ Mostrar formulario de edición
    editForm: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            const categories = await db.Category.findAll();
            if (!product) return res.status(404).send("Producto no encontrado");

            res.render("products/editProduct", { title: "Editar Producto", product, categories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🔄 Actualizar un producto
    update: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) return res.status(404).send("Producto no encontrado");

            await product.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categoryId: req.body.categoryId,
                brandId: req.body.brandId || null,
                colorId: req.body.colorId || null,
                image: req.file ? req.file.filename : product.image
            });

            res.redirect("/products");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 🗑 Eliminar un producto
    delete: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) return res.status(404).send("Producto no encontrado");

            await product.destroy();
            res.redirect("/products");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productsController;

