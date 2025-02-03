const db = require("../database/models");

const productsController = {

    // 🏠 Listar todos los productos
    // 📌 Listar todos los productos
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();
            const categories = await db.Category.findAll();

            res.render("products/allProducts", {
                title: "Todos los productos",
                products,
                categories,
                category: req.query.category || "",
                user: req.session.user
            });
        } catch (error) {
            console.error("Error al obtener productos y categorías:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // 📌 Filtrar productos por categoría
    filter: async (req, res) => {
        try {
            const categoryId = req.query.category;
            const products = await db.Product.findAll({
                where: categoryId ? { categoryId } : {}  // ✅ Filtrar solo si se selecciona una categoría
            });
            const categories = await db.Category.findAll(); // ✅ Asegurar que siempre se envían las categorías

            res.render("products/allProducts", {
                title: "Todos los productos",
                products,
                categories,  // ✅ Enviar categorías a la vista
                category: categoryId,
                user: req.session.user
            });
        } catch (error) {
            console.error("Error al filtrar productos:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // 🔍 Buscar productos
    search: async (req, res) => {
        try {
            const query = req.query.query ? req.query.query.toLowerCase().trim() : null;
            if (!query) return res.redirect("/products");

            const filteredProducts = await db.Product.findAll({
                where: {
                    [db.Sequelize.Op.or]: [
                        { name: { [db.Sequelize.Op.like]: `%${query}%` } },
                        { description: { [db.Sequelize.Op.like]: `%${query}%` } }
                    ]
                }
            });

            const categories = await db.Category.findAll(); // ✅ Asegurar que las categorías están en la vista

            res.render("products/allProducts", {
                title: `Resultados para "${req.query.query}"`,
                products: filteredProducts,
                categories,  // ✅ Pasar categorías a la vista
                category: "",
                user: req.session.user
            });
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // 🔎 Detalle de un producto
    async detail(req, res) {
        try {
            const product = await db.Product.findByPk(req.params.id, {
                include: [
                    { model: db.Category, as: "category" },  // ✅ Alias correcto
                    { model: db.Brand, as: "brand" },  // ✅ Alias correcto
                    { model: db.Color, as: "color" }  // ✅ Alias correcto
                ]
            });

            if (!product) return res.status(404).send("Producto no encontrado");

            console.log("Producto obtenido:", JSON.stringify(product, null, 2)); // 🔍 Debug

            res.render("products/productDetail", { title: product.name, product });
        } catch (error) {
            console.error("Error en detalle del producto:", error);
            res.status(500).json({ error: error.message });
        }
    }
    ,

    // 🛠 Mostrar formulario de creación
    createForm: async (req, res) => {
        try {
            const categories = await db.Category.findAll();
            const brands = await db.Brand.findAll();  // ✅ Obtener todas las marcas
            const colors = await db.Color.findAll();  // ✅ Obtener todos los colores

            res.render("products/createProduct", {
                title: "Crear Producto",
                categories,
                brands,  // ✅ Pasamos marcas a la vista
                colors   // ✅ Pasamos colores a la vista
            });
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
                brandId: req.body.brandId || null,  // ✅ Capturar correctamente brandId
                colorId: req.body.colorId || null,  // ✅ Capturar correctamente colorId
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
            const brands = await db.Brand.findAll();  // ✅ Obtener marcas
            const colors = await db.Color.findAll();  // ✅ Obtener colores

            if (!product) return res.status(404).send("Producto no encontrado");

            res.render("products/editProduct", {
                title: "Editar Producto",
                product,
                categories,
                brands,  // ✅ Pasamos marcas a la vista
                colors   // ✅ Pasamos colores a la vista
            });
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
                originalPrice: req.body.originalPrice || product.originalPrice,
                discountedPrice: req.body.discountedPrice || product.price,
                categoryId: req.body.categoryId,
                brandId: req.body.brandId || null,
                colorId: req.body.colorId || null,
                image: req.file ? req.file.filename : product.image,
                isFeatured: req.body.isFeatured ? true : false,
                isDiscounted: req.body.isDiscounted ? true : false
            });

            res.redirect("/products");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
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
    },

    async checkout(req, res) {
        try {
            const userId = req.session.user.id;

            let cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem }] });

            if (!cart || cart.cartItems.length === 0) {
                return res.redirect("/cart");
            }

            // 🚀 Aquí podrías implementar lógica de pago antes de vaciar el carrito.

            await CartItem.destroy({ where: { cartId: cart.id } });

            await cart.update({ total_price: 0 });

            res.redirect("/cart");
        } catch (error) {
            console.error("❌ Error al procesar la compra:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 📌 Obtener todos los productos y sus categorías
    allProducts: async (req, res) => {
        try {
            const categoryId = req.query.category || null;

            let products;
            if (categoryId) {
                products = await db.Product.findAll({
                    where: { categoryId },
                    include: ["category"]
                });
            } else {
                products = await db.Product.findAll({ include: ["category"] });
            }

            const categories = await db.Category.findAll();

            // 📌 Convertir `price` a número y evitar valores `null`
            const formattedProducts = products.map(product => ({
                ...product.dataValues,
                price: parseFloat(product.price) || 0  // 🔥 Convertimos a número
            }));

            res.render("products/allProducts", {
                title: "Todos los Productos",
                products: formattedProducts, // 📌 Usar los productos formateados
                categories,
                category: categoryId
            });
        } catch (error) {
            console.error("❌ Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 📌 Alternar estado de "Destacado"
    home: async (req, res) => {
        try {
            const featuredProducts = await db.Product.findAll({ where: { isFeatured: true } });
            const discountedProducts = await db.Product.findAll({ where: { isDiscounted: true } });

            res.render("home", {
                title: "Inicio",
                featuredProducts,
                discountedProducts
            });
        } catch (error) {
            console.error("❌ Error al cargar home:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 📌 Alternar estado de "Destacado"
    toggleFeatured: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) return res.status(404).send("Producto no encontrado");

            await product.update({ isFeatured: !product.isFeatured });
            res.redirect("/products");
        } catch (error) {
            console.error("❌ Error al cambiar destacado:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 📌 Alternar estado de "Descuento"
    toggleDiscount: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) return res.status(404).send("Producto no encontrado");

            await product.update({ isDiscounted: !product.isDiscounted });
            res.redirect("/products");
        } catch (error) {
            console.error("❌ Error al cambiar descuento:", error);
            res.status(500).send("Error interno del servidor");
        }
    }



};

module.exports = productsController;

