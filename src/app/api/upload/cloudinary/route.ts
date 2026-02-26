import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getAuthFromRequest } from "@/lib/jwt";

// Cloudinary reads CLOUDINARY_URL from env automatically
cloudinary.config();

/**
 * POST /api/upload/cloudinary - Upload a file to Cloudinary (authenticated)
 * Body: multipart/form-data with "file" field
 * Returns: { url: string, secureUrl: string }
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthFromRequest(req);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    return NextResponse.json(
      { error: "Cloudinary not configured. Set CLOUDINARY_URL in .env" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (buffer.length > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 50MB" },
        { status: 400 }
      );
    }

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "calaya-documents",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error("Upload failed"));
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      secureUrl: result.secure_url,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Cloudinary upload error:", err?.message ?? err);
    return NextResponse.json(
      { error: err?.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
