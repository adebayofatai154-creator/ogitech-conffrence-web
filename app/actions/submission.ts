"use server";

import { prisma } from "@/lib/prisma";
import { uploadResearchDocument } from "@/lib/cloudinary";
import { submissionSchema, validateResearchFile } from "@/lib/validation";

export type SubmissionResult =
  | { success: true; submissionId: string; fullName: string; submittedAt: string }
  | { success: false; fieldErrors?: Record<string, string>; message: string };

export async function submitResearch(formData: FormData): Promise<SubmissionResult> {
  const raw = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phoneNumber: String(formData.get("phoneNumber") ?? ""),
  };

  const parsed = submissionSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { success: false, fieldErrors, message: "Please correct the errors below." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Please attach your research document." };
  }

  const fileCheck = validateResearchFile({ type: file.type, size: file.size, name: file.name });
  if (!fileCheck.valid) {
    return { success: false, message: fileCheck.errors.join(" ") };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadResearchDocument(buffer, file.name);

    const submission = await prisma.researchSubmission.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phoneNumber: parsed.data.phoneNumber,
        fileUrl: uploaded.secureUrl,
        filePublicId: uploaded.publicId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        status: "SUBMITTED",
      },
    });

    return {
      success: true,
      submissionId: submission.id,
      fullName: submission.fullName,
      submittedAt: submission.submittedAt.toISOString(),
    };
  } catch (error) {
    console.error("Submission failed:", error);
    return {
      success: false,
      message: "We couldn't process your submission right now. Please try again in a moment.",
    };
  }
}
