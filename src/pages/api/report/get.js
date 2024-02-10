// pages/api/category/get.js
import authMiddleware from "@/middleware/auth_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    // Handler untuk mendapatkan data kategori
    const reports = await prisma.reports.findMany({
      select: {
        id: true,
        image: true,
        report_name: true,
        description: true,
        location: true,
        uploaded: true,
        category: true,
        progress: true,
        author: {
          select: {
            id: true,
            username: true,
            role: true,
            profileImage: true,
          },
        },
        response: true,
      },
    });
    res.status(200).json({ reports });
  } catch (error) {
    console.error("Error in progress/get endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default authMiddleware(handler);
