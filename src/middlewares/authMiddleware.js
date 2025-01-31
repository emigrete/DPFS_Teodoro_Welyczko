module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login"); // ⬅️ Si NO está logueado, lo mandamos a login
    }
    next(); // ⬅️ Si está logueado, puede continuar
};

