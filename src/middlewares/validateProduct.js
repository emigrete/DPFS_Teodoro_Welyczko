const { body } = require("express-validator");

module.exports = [
    body("name")
        .notEmpty().withMessage("El nombre del producto es obligatorio.")
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres."),

    body("description")
        .notEmpty().withMessage("La descripción es obligatoria.")
        .isLength({ min: 20 }).withMessage("La descripción debe tener al menos 20 caracteres."),

    body("price")
        .notEmpty().withMessage("El precio es obligatorio.")
        .isFloat({ min: 0.01 }).withMessage("El precio debe ser un número positivo."),

    body("originalPrice")
        .optional()
        .isFloat({ min: 0.01 }).withMessage("El precio sin descuento debe ser un número positivo."),

    body("discountedPrice")
        .optional()
        .isFloat({ min: 0 }).withMessage("El precio con descuento debe ser un número positivo.")
        .custom((value, { req }) => {
            if (value && parseFloat(value) >= parseFloat(req.body.originalPrice)) {
                throw new Error("El precio con descuento debe ser menor que el precio original.");
            }
            return true;
        }),

    body("categoryId")
        .notEmpty().withMessage("Debes seleccionar una categoría válida."),

    body("brandId")
        .notEmpty().withMessage("Debes seleccionar una marca válida."),

    body("colorId")
        .notEmpty().withMessage("Debes seleccionar un color válido."),

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
