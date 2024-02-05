// pages/api/category/get.js
import adminMiddleware from "@/middleware/admin_middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    // Handler untuk mendapatkan data kategori
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        address: true,
        role: true,
        fullname: true,
        phone: true,
        profileImage: true,
        response: true,
      },
      where: {
        id: req.userId,
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in progress/get endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default adminMiddleware(handler);
