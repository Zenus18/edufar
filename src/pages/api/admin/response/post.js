// pages/api/category/post.js
import { PrismaClient } from "@prisma/client";
import adminMiddleware from "@/middleware/admin_middleware";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  try {
    // Handler untuk membuat data kategori
    const { description, report_id } = req.body;

    if (!progress_name) {
      return res.status(400).json({ error: "Progress Name is required" });
    }

    const progress = await prisma.response.create({
      data: {
        report: {
          connect: report_id,
        },
        user: {
          connect: req.userId,
        },
        description: description,
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

export default adminMiddleware(handler);
