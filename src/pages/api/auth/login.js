// pages/api/auth/login.js
import { comparePassword, generateToken } from "../../../utils/auth";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const prisma = new PrismaClient();
const upload = multer();

export const config = {
  api: {
    bodyParser: false, // Tidak perlu mengurai body sebagai JSON
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  upload.any()(req, res, async (err) => {
    if (err) {
      console.error("Error handling form-data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(403).json({ message: "Invalid username or password" });
      return;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user || !(await comparePassword(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user.id);

      res
        .status(200)
        .json({ access_token: token, token_type: "Bearer", role: user.role });
    } catch (error) {
      console.error("Error querying database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  });
}
