const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
    body("firstName")
        .notEmpty().withMessage("El nombre es obligatorio.")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres."),
    
    body("lastName")
        .notEmpty().withMessage("El apellido es obligatorio.")
        .isLength({ min: 2 }).withMessage("El apellido debe tener al menos 2 caracteres."),

    body("email")
        .notEmpty().withMessage("El email es obligatorio.")
        .isEmail().withMessage("Debes ingresar un email válido.")
        .custom(async (value) => {
            const existingUser = await db.User.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error("Este email ya está registrado.");
            }
        }),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria.")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula.")
        .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula.")
        .matches(/\d/).withMessage("La contraseña debe contener al menos un número.")
        .matches(/[\W_]/).withMessage("La contraseña debe contener al menos un carácter especial."),

    body("confirm-password")
        .notEmpty().withMessage("Debes confirmar tu contraseña.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Las contraseñas no coinciden.");
            }
            return true;
        }),

    body("image").custom((value, { req }) => {
        if (req.file) {
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
            const fileExtension = req.file.originalname.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(`.${fileExtension}`)) {
                throw new Error("Solo se permiten archivos JPG, JPEG, PNG o GIF.");
            }
        }
        return true;
    })
];
