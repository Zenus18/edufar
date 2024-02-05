// pages/api/reports/post.js
import authMiddleware from "@/middleware/auth_middleware";
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
import { app } from "@/firebaseconfig"; // Sesuaikan dengan lokasi file konfigurasi Anda
import getFormattedDate from "@/utils/date";

const prisma = new PrismaClient();
const metadata = { contentType: "image/jpeg" };
const storage = getStorage(app);
const upload = multer({ storage: multer.memoryStorage() }).single("image");

const handler = async (req, res) => {
  let imageUrl = null;

  try {
    // Handle file upload
    await promisify(upload)(req, res);

    const { report_name, category_id, description, location, report_id } =
      req.body;

    if (req.file) {
      const buffer = Buffer.from(req.file.buffer);
      const filename = Date.now() + req.file.originalname.replace(/\s+/g, "_");

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `report_images/${filename}`);
      await uploadBytes(storageRef, buffer, metadata);

      // Get the download URL
      imageUrl = await getDownloadURL(storageRef);
    }

    const progress = await prisma.progress.findFirst();
    const date = getFormattedDate();
    const report = await prisma.reports.update({
      data: {
        report_name,
        author: { connect: { id: req.userId } },
        category: { connect: { id: category_id } },
        description,
        progress: { connect: { id: progress.id } },
        location,
        uploaded: date,
        image: imageUrl,
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            address: true,
            username: true,
            phone: true,
            fullname: true,
          },
        },
        progress: true,
      },
      where: {
        id: report_id,
      },
    });

    return res.status(201).json({ Message: "Success", report, status: 201 });
  } catch (error) {
    console.error("Error in reports/post endpoint:", error);
    if (imageUrl) {
      const refStorage = ref(storage, imageUrl);
      deleteObject(refStorage)
        .then(() => {
          console.log("Image Successfully deleted");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
      console.error("Firebase Storage Error:", error.customData.serverResponse);
    }
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export const config = {
  api: {
    bodyParser: false, // No need to parse body as JSON
  },
};

export default authMiddleware(handler);
