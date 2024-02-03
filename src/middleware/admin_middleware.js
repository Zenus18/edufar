// middleware/authMiddleware.js
import { verifyToken } from "../utils/auth";
import { PrismaClient } from "@prisma/client";
const adminMiddleware = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization;
    const prisma = new PrismaClient();
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = verifyToken(token.replace("Bearer ", ""));
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!userId) {
      if (user.role !== "admin") {
        return res.status(401).json({ error: "you're not admin" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = userId;
    return handler(req, res);
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default adminMiddleware;
