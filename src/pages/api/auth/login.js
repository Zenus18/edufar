// pages/api/auth/login.js
import { comparePassword, generateToken } from "../../../utils/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.status(200).json({ "access-token": token, "token-type": "Bearer" });
}
