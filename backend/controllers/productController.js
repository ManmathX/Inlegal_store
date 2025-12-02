const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { isActive: true }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { items } = req.body; // items: [{ productId, quantity }]

        let total = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.productId } });
            if (!product) throw new Error(`Product ${item.productId} not found`);
            if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

            total += product.price * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });

            // Decrease stock
            await prisma.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            });
        }

        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                total,
                status: 'PENDING',
                items: {
                    create: orderItemsData
                }
            },
            include: { items: true }
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getProducts, createOrder };
