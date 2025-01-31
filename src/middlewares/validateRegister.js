const { body } = require("express-validator");

module.exports = [
    body("name").notEmpty().withMessage("El nombre es obligatorio."),
    body("email")
        .isEmail().withMessage("Debes ingresar un email válido."),
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
