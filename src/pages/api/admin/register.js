// pages/api/auth/register.js
import { hashPassword } from "../../../utils/auth";
import { generateToken } from "../../../utils/auth";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { promisify } from "util";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { app } from "@/firebaseconfig";
import adminMiddleware from "@/middleware/admin_middleware";
const prisma = new PrismaClient();
const metadata = { contentType: "image/jpeg" };
const storage = getStorage(app);
const upload = multer({ storage: multer.memoryStorage() }).single(
  "profileImage"
);

async function handler(req, res) {
  let imageUrl = null;

  try {
    await promisify(upload)(req, res);
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { username, password, fullname, phone, address } = req.body;

    if (req.file) {
      const buffer = Buffer.from(req.file.buffer);
      const filename = Date.now() + req.file.originalname.replace(/\s+/g, "_");

      const storageRef = ref(storage, `profile_images/${filename}`);
      await uploadBytes(storageRef, buffer, metadata);

      imageUrl = await getDownloadURL(storageRef);
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        fullname,
        phone,
        role: "admin",
        address,
        profileImage: imageUrl ?? "",
      },
    });

    const token = generateToken(user.id);
    return res.status(201).json({ message: "register success" });
  } catch (error) {
    console.error("Error in register endpoint:", error);
    if (imageUrl) {
      const refStorage = ref(storage, imageUrl);
      try {
        await deleteObject(refStorage);
        console.log("Image Successfully deleted");
      } catch (deleteError) {
        console.error("Error deleting image:", deleteError);
      }
    }

    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
export const config = {
  api: {
    bodyParser: false, // No need to parse body as JSON
  },
};
export default adminMiddleware(handler);
