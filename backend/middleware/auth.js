const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_do_not_use_in_prod');
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { adminProfile: true }
        });

        if (!user) {
            throw new Error();
        }

        if (user.isBanned) {
            return res.status(403).json({ error: 'User is banned', reason: user.bannedReason });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;
