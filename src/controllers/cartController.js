const { Cart, CartItem, Product } = require("../database/models");

const cartController = {
    async showCart(req, res) {
        try {
            const cart = await Cart.findOne({
                where: { userId: req.session.user.id },
                include: [{
                    model: CartItem,
                    as: "cartItems",
                    include: [{
                        model: Product,
                        as: "product"
                    }]
                }]
            });
    
            console.log("🟢 Carrito obtenido:", JSON.stringify(cart, null, 2)); // 🐛 Debug
    
            let total = 0;
    
            if (!cart) {
                console.log("🔴 No se encontró un carrito para este usuario.");
            } else if (!cart.cartItems || cart.cartItems.length === 0) {
                console.log("🔴 El carrito existe pero no tiene productos.");
            } else {
                console.log(`🟢 El carrito tiene ${cart.cartItems.length} productos.`);
                total = cart.cartItems.reduce((sum, item) => sum + parseFloat(item.price) || 0, 0);
            }
    
            return res.render("products/productCart", { 
                title: "Carrito de Compras", 
                cart, 
                total: total // 🔹 Asegurar que total sea numérico
            });
    
        } catch (error) {
            console.error("❌ Error al obtener el carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    async addToCart(req, res) {
        try {
            // 🔍 Verificar si el usuario está logueado
            if (!req.session.user) {
                return res.redirect("/login"); // 🔹 Redirige a login si no está autenticado
            }
    
            const { productId, quantity } = req.body;
            const userId = req.session.user.id;
    
            let cart = await Cart.findOne({ where: { userId } });
    
            if (!cart) {
                cart = await Cart.create({ userId, total_price: 0 });
            }
    
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
    
            let item = await CartItem.findOne({
                where: { cartId: cart.id, productId }
            });
    
            if (item) {
                item.quantity += parseInt(quantity);
                item.price = item.quantity * product.price;
                await item.save();
            } else {
                await CartItem.create({
                    cartId: cart.id,
                    productId,
                    quantity: parseInt(quantity),
                    price: product.price * quantity
                });
            }
    
            // 🔹 Verificar que realmente se estén guardando los productos
            const allCartItems = await CartItem.findAll({ where: { cartId: cart.id } });
            console.log("🟢 Productos en el carrito tras agregar:", allCartItems.length);
    
            const totalPrice = allCartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
            await cart.update({ total_price: totalPrice });
    
            res.redirect("/cart");
        } catch (error) {
            console.error("❌ Error al agregar producto al carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    async removeFromCart(req, res) {
        try {
            const { productId } = req.body;
            const userId = req.session.user.id;
    
            let cart = await Cart.findOne({ where: { userId } });
    
            if (!cart) {
                return res.status(404).send("Carrito no encontrado");
            }
    
            let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    
            if (!item) {
                return res.status(404).send("Producto no encontrado en el carrito");
            }
    
            await item.destroy();
    
            // Recalcular el total del carrito
            const remainingItems = await CartItem.findAll({ where: { cartId: cart.id } });
            const totalPrice = remainingItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
            await cart.update({ total_price: totalPrice });
    
            res.redirect("/cart");
        } catch (error) {
            console.error("❌ Error al eliminar producto del carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    async increaseQuantity(req, res) {
        try {
            const { productId } = req.body;
            const userId = req.session.user.id;
    
            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) return res.status(404).send("Carrito no encontrado");
    
            let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
            if (!item) return res.status(404).send("Producto no encontrado en el carrito");
    
            item.quantity += 1;
            item.price = item.quantity * (await Product.findByPk(productId)).price;
            await item.save();
    
            res.redirect("/cart");
        } catch (error) {
            console.error("❌ Error al aumentar cantidad:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    
    async decreaseQuantity(req, res) {
        try {
            const { productId } = req.body;
            const userId = req.session.user.id;
    
            let cart = await Cart.findOne({ where: { userId } });
            if (!cart) return res.status(404).send("Carrito no encontrado");
    
            let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
            if (!item) return res.status(404).send("Producto no encontrado en el carrito");
    
            if (item.quantity > 1) {
                item.quantity -= 1;
                item.price = item.quantity * (await Product.findByPk(productId)).price;
                await item.save();
            } else {
                await item.destroy();
            }
    
            res.redirect("/cart");
        } catch (error) {
            console.error("❌ Error al disminuir cantidad:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
    
};

module.exports = cartController;

