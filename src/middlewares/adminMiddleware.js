module.exports = (req, res, next) => {
    console.log("Verificando usuario en sesión:", req.session.user); // 🔥 Verifica que el usuario esté en la sesión

    if (req.session.user && req.session.user.role === "admin") {
        next();  // Si es admin, continuar
    } else {
        res.redirect("/");
    }
};
