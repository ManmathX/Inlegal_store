const prisma = require("../clients");

async function createProduct(req, res) {
  try {
    const { name, description, priceCents } = req.body || {};
    if (!name || typeof priceCents !== "number") {
      return res.status(400).send({ error: "name and priceCents (number) are required" });
    }
    const data = await prisma.product.create({
      data: {
        name,
        description: description ?? null,
        priceCents,
      },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to create product", details: String(err) });
  }
}

async function getProducts(req, res) {
  try {
    const data = await prisma.product.findMany();
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch products", details: String(err) });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, priceCents } = req.body || {};
    const data = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(priceCents !== undefined ? { priceCents } : {}),
      },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to update product", details: String(err) });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const data = await prisma.product.delete({ where: { id: Number(id) } });
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "Failed to delete product", details: String(err) });
  }
}

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
