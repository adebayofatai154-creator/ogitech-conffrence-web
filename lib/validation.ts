import { z } from "zod";
import { siteConfig } from "./site-config";

export const submissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(120, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+()\-\s]+$/, "Phone number contains invalid characters"),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function validateResearchFile(file: { type: string; size: number; name: string }) {
  const errors: string[] = [];
  const maxBytes = siteConfig.maxUploadMb * 1024 * 1024;

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    errors.push("Only PDF or Word documents are accepted. Please upload a PDF where possible.");
  }
  if (file.size > maxBytes) {
    errors.push(`File exceeds the ${siteConfig.maxUploadMb}MB limit.`);
  }
  if (file.size === 0) {
    errors.push("The selected file is empty.");
  }
  return { valid: errors.length === 0, errors };
}

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const statusUpdateSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "PUBLISHED"]),
});
