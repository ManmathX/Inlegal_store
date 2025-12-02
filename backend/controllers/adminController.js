const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getStats = async (req, res) => {
    try {
        const [userCount, postCount, pendingPostCount, orderCount] = await Promise.all([
            prisma.user.count(),
            prisma.post.count(),
            prisma.post.count({ where: { status: 'PENDING' } }),
            prisma.order.count()
        ]);

        res.json({
            userCount,
            postCount,
            pendingPostCount,
            orderCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const approvePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                status: 'APPROVED',
                approvedAt: new Date(),
                approvedBy: req.user.id
            }
        });

        // Log action
        await prisma.auditLog.create({
            data: {
                action: 'APPROVE',
                targetType: 'Post',
                targetId: postId,
                adminId: req.user.id,
                details: JSON.stringify({ title: post.title }),
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }
        });

        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const rejectPost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { reason } = req.body;

        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                status: 'REJECTED',
                rejectedAt: new Date(),
                rejectedBy: req.user.id,
                rejectionReason: reason
            }
        });

        // Log action
        await prisma.auditLog.create({
            data: {
                action: 'REJECT',
                targetType: 'Post',
                targetId: postId,
                adminId: req.user.id,
                details: JSON.stringify({ title: post.title, reason }),
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }
        });

        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const banUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { reason } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                isBanned: true,
                bannedAt: new Date(),
                bannedBy: req.user.id,
                bannedReason: reason
            }
        });

        // Log action
        await prisma.auditLog.create({
            data: {
                action: 'BAN',
                targetType: 'User',
                targetId: userId,
                adminId: req.user.id,
                details: JSON.stringify({ reason }),
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }
        });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getStats, approvePost, rejectPost, banUser };
