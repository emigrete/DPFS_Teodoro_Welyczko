module.exports = (req, res, next) => {
    return req.session.user ? res.redirect('/profile') : next();
};
