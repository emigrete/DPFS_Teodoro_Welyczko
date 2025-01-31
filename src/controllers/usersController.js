const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Ruta del archivo JSON de usuarios
const usersFilePath = path.join(__dirname, "../data/users.json");

// Función para leer usuarios desde el JSON
const getUsers = () => {
    const fileContent = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(fileContent);
};

// Controlador de usuarios
const usersController = {
    // 📌 Mostrar formulario de registro
    registerForm: (req, res) => {
        res.render("users/register", {
            title: "Registro - ETECH",
            errors: {},
            oldData: {}
        });
    },

    // 📌 Mostrar perfil del usuario logueado
    profile: (req, res) => {
        if (!req.session.user) {
            return res.redirect("/login");
        }

        console.log("🔍 Datos enviados a profile.ejs:", {
            title: "Mi Perfil - ETECH",
            user: req.session.user
        });

        res.render("users/profile", {
            title: "Mi Perfil - ETECH", // 📌 Esto es clave
            user: req.session.user
        });
    },




    // 📌 Procesar el registro de usuario
    register: (req, res) => {
        let users = getUsers();
        let errors = validationResult(req);

        // Validar si hay errores
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                title: "Registro - ETECH",
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        // Validar si el email ya está registrado
        let existingUser = users.find(u => u.email === req.body.email);
        if (existingUser) {
            return res.render("users/register", {
                title: "Registro - ETECH",
                errors: { email: { msg: "Este correo ya está registrado" } },
                oldData: req.body
            });
        }

        // Crear el nuevo usuario
        // Crear el nuevo usuario
        let newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            role: users.length === 0 ? "admin" : "user", // El primer usuario será admin
            image: req.file ? req.file.filename : "default.jpg" // ⬅️ Si no sube imagen, usa default.jpg
        };


        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.redirect("/");


    },

    // 📌 Mostrar formulario de login
    loginForm: (req, res) => {
        res.render("users/login", { title: "Iniciar Sesión - ETECH" });
    },

    // 📌 Procesar login
    login: (req, res) => {
        let users = getUsers();
        let user = users.find(u => u.email === req.body.email);
    
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render("users/login", {
                title: "Iniciar Sesión - ETECH",
                error: "Credenciales incorrectas",
                oldData: req.body
            });
        }
    
        // Guardar usuario en sesión
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
        };
    
        console.log("🟢 Usuario logueado correctamente:", req.session.user); // 🔍 Verificar que se guarda
    
        // Si el usuario tildó "recordarme", guardar en cookies por 7 días
        if (req.body.remember) {
            console.log("🟢 Guardando cookie para recordar usuario:", user.email);
            res.cookie("userEmail", user.email, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
        }
    
        // 📌 Asegurar que la sesión se guarda antes de redirigir
        req.session.save(() => {
            res.redirect("/profile");
        });
    },
    

    // 📌 Cerrar sesión
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userEmail");
        res.redirect("/login");

    }

    
};



module.exports = usersController;
