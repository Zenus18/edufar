// pages/api/reports/post.js
import authMiddleware from "@/middleware/auth_middleware";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { promisify } from "util";
import path from "path";
import { verifyToken } from "@/utils/auth";
import { writeFile, unlink } from "fs/promises";
import getFormattedDate from "@/utils/date";
const prisma = new PrismaClient();

// Set up multer storage and upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const handler = async (req, res) => {
  let imageUrl = null;
  try {
    // Handle file upload
    await promisify(upload)(req, res);

    const { report_name, category_id, description, location } = req.body;

    if (req.file) {
      const buffer = Buffer.from(req.file.buffer);
      const filename = Date.now() + req.file.originalname.replace(/\s+/g, "_");

      const filePath = path.join(process.cwd(), "public/uploads/" + filename);
      await writeFile(filePath, buffer);

      imageUrl = `${process.env.NEXT_BASE_URL}/uploads/${filename}`;
    }
    const progress = await prisma.progress.findFirst();
    const date = getFormattedDate();
    const report = await prisma.reports.create({
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
    });

    return res.status(201).json({ Message: "Success", report, status: 201 });
  } catch (error) {
    console.error("Error in reports/post endpoint:", error);
    if (imageUrl) {
      const imagePath = path.join(
        process.cwd(),
        "public/uploads/",
        imageUrl.split("/").pop()
      );
      try {
        await unlink(imagePath);
      } catch (unlinkError) {
        console.error("Error deleting image:", unlinkError);
      }
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
