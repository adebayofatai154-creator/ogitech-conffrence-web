import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type UploadedDocument = {
  secureUrl: string;
  publicId: string;
  bytes: number;
  format: string;
};

/**
 * Uploads a research document to Cloudinary under a dedicated folder.
 * Runs server-side only — never import this file into a Client Component.
 */
export async function uploadResearchDocument(
  fileBuffer: Buffer,
  originalFileName: string
): Promise<UploadedDocument> {
  const result = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ogitech-conference/research-submissions",
        resource_type: "auto",
        use_filename: true,
        unique_filename: true,
        filename_override: originalFileName,
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary upload failed"));
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });

  return {
    secureUrl: result.secure_url,
    publicId: result.public_id,
    bytes: result.bytes,
    format: result.format,
  };
}

export async function deleteResearchDocument(publicId: string) {
  await cloudinary.uploader.destroy(publicId, { resource_type: "raw", invalidate: true });
}
