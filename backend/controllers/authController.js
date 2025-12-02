const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER'
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev_secret_do_not_use_in_prod', { expiresIn: '7d' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        if (user.isBanned) {
            return res.status(403).json({ error: 'User is banned', reason: user.bannedReason });
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'dev_secret_do_not_use_in_prod', { expiresIn: '7d' });

        res.send({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMe = async (req, res) => {
    res.send(req.user);
};

module.exports = { register, login, getMe };
