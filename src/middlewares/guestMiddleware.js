module.exports = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile');  // Redirigir a perfil si ya está logueado
    }
    next();
};