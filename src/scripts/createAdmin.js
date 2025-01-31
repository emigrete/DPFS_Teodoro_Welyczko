const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

// Leer los usuarios actuales
let users = [];
try {
    const fileContent = fs.readFileSync(usersFilePath, "utf-8");
    users = JSON.parse(fileContent);
} catch (error) {
    console.log("⚠️ No se encontró el archivo de usuarios, creando uno nuevo...");
}

// Verificar si el admin ya existe
if (users.some(user => user.email === "admin@etech.com")) {
    console.log("✅ El usuario admin ya existe en la base de datos.");
    process.exit();
}

// Crear el usuario admin
const adminUser = {
    id: users.length + 1,
    name: "Admin",
    email: "admin@etech.com",
    password: bcrypt.hashSync("admin123", 10),  // Contraseña encriptada
    role: "admin",
    image: "default.jpg"
};

// Agregar el usuario a la lista
users.push(adminUser);

// Guardar en el JSON
fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

console.log("✅ Usuario Admin creado con éxito:");
console.log(`   Email: ${adminUser.email}`);
console.log(`   Contraseña: admin123 (encriptada)`);

process.exit();
