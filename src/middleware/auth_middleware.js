// middleware/authMiddleware.js
import { verifyToken } from "../utils/auth";

const authMiddleware = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = verifyToken(token.replace("Bearer ", ""));

    if (!userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = userId;
    return handler(req, res);
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
