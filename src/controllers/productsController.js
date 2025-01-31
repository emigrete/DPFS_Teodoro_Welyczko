const fs = require("fs");
const path = require("path");

// Ruta del archivo JSON
const productsFilePath = path.join(__dirname, "../data/products.json");

// Función para leer los productos desde el JSON
const getProducts = () => {
    const fileContent = fs.readFileSync(productsFilePath, "utf-8");
    return JSON.parse(fileContent);
};

// Controlador de productos
const productsController = {

    // 🏠 Listar todos los productos
    list: (req, res) => {
        const products = getProducts(); 
        res.render("products/allProducts", { 
            title: "Todos los productos", 
            products, 
            user: req.session.user,
            category: "" // 🔹 Se envía un valor vacío para evitar el error
        });
    }
    ,

    // 🎨 Filtrar productos por categoría
    filter: (req, res) => {
        const products = getProducts(); 
        let category = req.query.category ? req.query.category.trim() : "";
    
        console.log("Categoría seleccionada:", category); // ✅ Depuración
    
        if (!category) {
            console.log("No se recibió categoría, redirigiendo...");
            return res.redirect("/products");
        }
    
        // Filtrar productos por categoría
        const filteredProducts = products.filter(p => {
            console.log(`Producto: ${p.name}, Categoría: ${p.category}`); // ✅ Depuración
            return p.category.toLowerCase() === category.toLowerCase();
        });
    
        console.log("Productos encontrados:", filteredProducts.length); // ✅ Depuración
    
        res.render("products/allProducts", { 
            title: `Categoría: ${category}`, 
            products: filteredProducts, 
            user: req.session.user,
            category: category
        });
    }
    

    ,

    // 🔍 Buscar productos
    search: (req, res) => {
        const products = getProducts();
        const query = req.query.query ? req.query.query.toLowerCase() : null;
    
        if (!query) return res.redirect("/products");
    
        const filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );
    
        res.render("products/allProducts", { 
            title: `Resultados para "${req.query.query}"`, 
            products: filteredProducts, 
            user: req.session.user,
            category: "" // 👈 Asegura que category esté definida
        });
    }
    ,



    // 🔎 Detalle de un producto
    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (!product) return res.status(404).send("Producto no encontrado");

        res.render("products/productDetail", { title: product.name, product });
    },

    // 🛠 Mostrar formulario de creación
    createForm: (req, res) => {
        res.render("products/createProduct", { title: "Crear Producto - ETECH" });
    },

    // 🆕 Crear un producto
    create: (req, res) => {
        const products = getProducts();
    
        const newProduct = {
            id: products.length + 1,
            name: req.body.name || "Sin nombre",
            description: req.body.description || "Sin descripción",
            price: req.body.price || "0",
            category: req.body.category || "Sin categoría",
            color: req.body.color || "Sin color",
            image: req.file ? req.file.filename : "default.jpg"
        };
    
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    
        res.redirect("/products");
    },

    // ✏️ Mostrar formulario de edición
    editForm: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id == req.params.id);
        if (!product) return res.status(404).send("Producto no encontrado");

        res.render("products/editProduct", { title: "Editar Producto", product });
    },

    // 🔄 Actualizar un producto
    update: (req, res) => {
        let products = getProducts();
        const productIndex = products.findIndex(p => p.id == req.params.id);

        if (productIndex === -1) {
            return res.status(404).send("Producto no encontrado");
        }

        // 🛠 Depuración para revisar qué imagen llega en `req.file`
        console.log("Archivo subido:", req.file);

        // Actualizar datos del producto
        products[productIndex] = {
            ...products[productIndex], 
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            color: req.body.color,
            image: req.file ? req.file.filename : products[productIndex].image
        };

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

        res.redirect("/products");
    },




    // 🗑 Eliminar un producto
    delete: (req, res) => {
        let products = getProducts();
        const productId = req.params.id;
        
        const updatedProducts = products.filter(p => p.id != productId);

        fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));

        res.redirect("/products");
    }
};

module.exports = productsController;
