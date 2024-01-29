// pages/api/category/get.js
import authMiddleware from "@/middleware/auth_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    // Handler untuk mendapatkan data kategori
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error in category/get endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
