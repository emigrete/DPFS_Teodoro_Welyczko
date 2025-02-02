const db = require("../database/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

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
        if (!req.session.user) return res.redirect("/login");

        res.render("users/profile", {
            title: "Mi Perfil - ETECH",
            user: req.session.user
        });
    },

    // 📌 Procesar el registro de usuario
    register: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("users/register", {
                title: "Registro - ETECH",
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        let existingUser = await db.User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.render("users/register", {
                title: "Registro - ETECH",
                errors: { email: { msg: "Este correo ya está registrado" } },
                oldData: req.body
            });
        }

        try {
            const newUser = await db.User.create({
                firstName: req.body.firstName,  
                lastName: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                role: "user",
                image: req.file ? req.file.filename : "default.jpg"
            });

            console.log("✅ Usuario registrado correctamente:", newUser.email);
            res.redirect("/");
        } catch (error) {
            console.error("❌ Error en registro:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 📌 Mostrar formulario de login
    loginForm: (req, res) => {
        res.render("users/login", { title: "Iniciar Sesión - ETECH", oldData: {} }); 
    },

    // 📌 Procesar login
    login: async (req, res) => {
        try {
            console.log("🔍 Intentando login con:", req.body.email);

            let user = await db.User.findOne({ where: { email: req.body.email } });

            if (!user) {
                console.log("❌ Usuario no encontrado en la base de datos.");
                return res.render("users/login", {
                    title: "Iniciar Sesión - ETECH",
                    error: "Correo o contraseña incorrectos",
                    oldData: req.body
                });
            }

            console.log("✅ Usuario encontrado:", user.email);

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                console.log("❌ Contraseña incorrecta.");
                return res.render("users/login", {
                    title: "Iniciar Sesión - ETECH",
                    error: "Correo o contraseña incorrectos",
                    oldData: req.body
                });
            }

            console.log("🔐 Contraseña correcta, iniciando sesión...");

            req.session.user = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                image: user.image
            };

            console.log("🆗 Sesión guardada:", req.session.user);

            if (req.body.remember) {
                console.log("💾 Guardando cookie de recordarme.");
                res.cookie("userEmail", user.email, {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
                    httpOnly: true
                });
            }

            res.redirect("/profile");

        } catch (error) {
            console.error("❌ Error en login:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    // 📌 Cerrar sesión
    logout: (req, res) => {
        req.session.destroy(() => {
            res.clearCookie("userEmail");
            res.redirect("/login");
        });
    }
};

module.exports = usersController;
