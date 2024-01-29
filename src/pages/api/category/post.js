// pages/api/category/post.js
import authMiddleware from "@/middleware/auth_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler = async (req, res) => {
  try {
    // Handler untuk membuat data kategori
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const newCategory = await prisma.category.create({
      data: {
        category_name,
      },
    });

    res.status(201).json({ newCategory });
  } catch (error) {
    console.error("Error in category/post endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
