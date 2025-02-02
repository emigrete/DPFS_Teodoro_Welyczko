const db = require('./models'); // Importa los modelos
const { Op } = require('sequelize'); // Operadores de Sequelize

async function testSequelize() {
  try {
    console.log("🔍 Verificando conexión con la base de datos...");

    // 1️⃣ Verificar conexión a la base de datos
    await db.sequelize.authenticate();
    console.log("✅ Conexión exitosa con la base de datos.");

    // 2️⃣ Consultar los usuarios en la base de datos
    const users = await db.User.findAll();
    console.log("👤 Usuarios encontrados:", users.map(u => u.toJSON()));

    // 3️⃣ Insertar un nuevo usuario de prueba
    const newUser = await db.User.create({
      firstName: "Test",
      lastName: "User",
      email: `test${Date.now()}@example.com`,
      password: "test123", // ⚠️ Normalmente aquí se debe encriptar con bcrypt
      role: "user",
      image: "default.jpg"
    });
    console.log("🆕 Usuario creado:", newUser.toJSON());

    // 4️⃣ Buscar un producto en la base de datos
    const product = await db.Product.findOne();
    if (product) {
      console.log("🛍 Producto encontrado:", product.toJSON());
    } else {
      console.log("⚠️ No hay productos en la base de datos.");
    }

    // 5️⃣ Buscar productos en una categoría específica
    const category = await db.Category.findOne();
    if (category) {
      const categoryProducts = await db.Product.findAll({
        where: { categoryId: category.id }
      });
      console.log(`📂 Productos en la categoría ${category.name}:`, categoryProducts.map(p => p.toJSON()));
    }

    console.log("✅ Todas las pruebas se ejecutaron correctamente.");

  } catch (error) {
    console.error("❌ Error en la prueba de Sequelize:", error);
  } finally {
    process.exit(); // Cierra la ejecución
  }
}

testSequelize();
