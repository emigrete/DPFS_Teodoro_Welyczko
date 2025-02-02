const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
    body("firstName").notEmpty().withMessage("El nombre es obligatorio."),
    body("lastName").notEmpty().withMessage("El apellido es obligatorio."),
    body("email")
        .isEmail().withMessage("Debes ingresar un email válido.")
        .custom(async (value) => {
            const existingUser = await db.User.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error("Este email ya está registrado.");
            }
        }),
    body("password")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres."),
    body("confirm-password")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Las contraseñas no coinciden.");
            }
            return true;
        })
];
