module.exports = (req, res, next) => {
    return req.session.user ? next() : res.redirect("/login");
};
