// pages/api/auth/register.js
import { hashPassword } from "../../../utils/auth";
import { generateToken } from "../../../utils/auth";
import { PrismaClient } from "@prisma/client";
import adminMiddleware from "@/middleware/admin_middleware";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password, fullname, phone, address } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        fullname,
        role: "admin",
        phone,
        address,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({ "access-token": token, "token-type": "Bearer" });
  } catch (error) {
    console.error("Error in register endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Pastikan untuk selalu memanggil $disconnect setelah selesai menggunakan Prisma Client
  }
};
export default adminMiddleware(handler);
