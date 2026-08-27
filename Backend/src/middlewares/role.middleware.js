const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied: role "${req.user?.role}" is not allowed to perform this action`,
            });
        }
        next();
    }
}


module.exports = authorizeRoles;