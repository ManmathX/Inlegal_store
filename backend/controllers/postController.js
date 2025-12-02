const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createPost = async (req, res) => {
    try {
        const { title, description, category, isLegal } = req.body;
        const post = await prisma.post.create({
            data: {
                title,
                description,
                category,
                isLegal,
                userId: req.user.id,
                status: 'PENDING' // Default to pending
            }
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const { category, sort, status } = req.query;
        const where = {};

        // If status is provided, use it; otherwise default to APPROVED for public viewing
        if (status) {
            where.status = status;
        } else {
            where.status = 'APPROVED';
        }

        if (category) where.category = category;

        const orderBy = sort === 'popular' ? { upvotes: 'desc' } : { createdAt: 'desc' };

        const posts = await prisma.post.findMany({
            where,
            include: {
                user: { select: { name: true, profileImage: true, reputation: true } },
                _count: { select: { comments: true } }
            },
            orderBy
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                user: { select: { name: true, profileImage: true } },
                comments: {
                    include: { user: { select: { name: true, profileImage: true } } },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Increment view count
        await prisma.post.update({
            where: { id: post.id },
            data: { viewCount: { increment: 1 } }
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const votePost = async (req, res) => {
    try {
        const { isUpvote } = req.body;
        const postId = parseInt(req.params.id);
        const userId = req.user.id;

        // Check if vote exists
        const existingVote = await prisma.vote.findUnique({
            where: { postId_userId: { postId, userId } }
        });

        if (existingVote) {
            if (existingVote.isUpvote === isUpvote) {
                // Remove vote (toggle off)
                await prisma.vote.delete({ where: { id: existingVote.id } });
                await prisma.post.update({
                    where: { id: postId },
                    data: isUpvote ? { upvotes: { decrement: 1 } } : { downvotes: { decrement: 1 } }
                });
                return res.json({ message: 'Vote removed' });
            } else {
                // Change vote
                await prisma.vote.update({
                    where: { id: existingVote.id },
                    data: { isUpvote }
                });
                await prisma.post.update({
                    where: { id: postId },
                    data: isUpvote
                        ? { upvotes: { increment: 1 }, downvotes: { decrement: 1 } }
                        : { upvotes: { decrement: 1 }, downvotes: { increment: 1 } }
                });
                return res.json({ message: 'Vote updated' });
            }
        }

        // Create new vote
        await prisma.vote.create({
            data: { postId, userId, isUpvote }
        });
        await prisma.post.update({
            where: { id: postId },
            data: isUpvote ? { upvotes: { increment: 1 } } : { downvotes: { increment: 1 } }
        });

        res.json({ message: 'Vote recorded' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPost, getPosts, getPostById, votePost };
