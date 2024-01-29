import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjU0MTI5NywiaWF0IjoxNzA2NTQxMjk3fQ.HE2AEybgkJXp8IRmg7uiNn63LL8URxNQ438oPd_y65E"; // Ganti dengan kunci rahasia yang aman

export const generateToken = (userId) => {
  return jwt.sign({ userId }, secret, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
