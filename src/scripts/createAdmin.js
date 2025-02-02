const bcrypt = require("bcryptjs");
const db = require("../database/models");

async function createAdmin() {
    try {
        console.log("🔍 Buscando usuario Admin en la base de datos...");

        const existingAdmin = await db.User.findOne({ where: { email: "admin@etech.com" } });

        if (existingAdmin) {
            console.log("✅ El usuario Admin ya existe en la base de datos.");
            return process.exit();
        }

        console.log("🆕 Creando usuario Admin...");

        const adminUser = await db.User.create({
            firstName: "Admin",
            lastName: "ETECH",
            email: "admin@etech.com",
            password: bcrypt.hashSync("admin123", 10),  // 🔐 Contraseña encriptada
            role: "admin",
            image: "default.jpg"
        });

        console.log("✅ Usuario Admin creado con éxito:");
        console.log(`   Email: ${adminUser.email}`);
        console.log(`   Contraseña: admin123 (encriptada)`);

    } catch (error) {
        console.error("❌ Error al crear el usuario Admin:", error);
    } finally {
        process.exit();
    }
}

createAdmin();
