// pages/api/category/get.js
import constantProgress from "@/constant/progress";
import adminMiddleware from "@/middleware/admin_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    // Handler untuk mendapatkan data kategori
    const student = await prisma.user.findMany({
      where: {
        role: "student",
      },
    });
    const pending = await prisma.reports.findMany({
      where: {
        progress: {
          progress_name: constantProgress.pending,
        },
      },
    });
    const progress = await prisma.reports.findMany({
      where: {
        progress: {
          progress_name: constantProgress.on_progress,
        },
      },
    });
    const resolved = await prisma.reports.findMany({
      where: {
        progress: {
          progress_name: constantProgress.resolved,
        },
      },
    });
    const report = await prisma.reports.findMany({
      take: 5,
      orderBy: {
        uploaded: "desc",
      },
    });
    res.status(200).json({ pending, progress, resolved, student, report });
  } catch (error) {
    console.error("Error in progress/get endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default adminMiddleware(handler);
