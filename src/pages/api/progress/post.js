// pages/api/category/post.js
import authMiddleware from "@/middleware/auth_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler = async (req, res) => {
  try {
    // Handler untuk membuat data kategori
    const { progress_name } = req.body;

    if (!progress_name) {
      return res.status(400).json({ error: "Progress Name is required" });
    }

    const progress = await prisma.progress.create({
      data: {
        progress_name,
      },
    });

    res.status(201).json({ progress });
  } catch (error) {
    console.error("Error in progress/post endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
