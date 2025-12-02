const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
        }

        next();
    };
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user || !req.user.adminProfile) {
            return res.status(403).json({ error: 'Access denied: Admin profile required' });
        }

        const permissions = JSON.parse(req.user.adminProfile.permissions || '{}');

        // Check specific boolean flags first
        if (permission === 'canBanUsers' && req.user.adminProfile.canBanUsers) return next();
        if (permission === 'canDeletePosts' && req.user.adminProfile.canDeletePosts) return next();
        if (permission === 'canApprovePosts' && req.user.adminProfile.canApprovePosts) return next();
        if (permission === 'canManageUsers' && req.user.adminProfile.canManageUsers) return next();

        // Check JSON permissions
        if (permissions[permission]) {
            return next();
        }

        return res.status(403).json({ error: `Access denied: Missing permission ${permission}` });
    }
}

module.exports = { checkRole, checkPermission };
