// pages/api/category/get.js
import authMiddleware from "@/middleware/auth_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    // Handler untuk mendapatkan data kategori
    const progress = await prisma.progress.findMany();
    res.status(200).json({ progress });
  } catch (error) {
    console.error("Error in progress/get endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
