export function isAuthenticated(req, res, next) {
    if (req.session.currentUser) return next();
    res.status(401).json({ message: 'Not signed in' });
}

export function authorize(roles) {
    return (req, res, next) => {
        const role = req.session.currentUser?.role;
        if (roles.includes(role)) return next();
        res.status(403).json({ message: 'Access denied' });
    };
}