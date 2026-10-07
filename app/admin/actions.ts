"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionCookie, destroySessionCookie, verifyPassword, getSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { generateUniqueSlug } from "@/lib/slug";
import type { SubmissionStatus } from "@prisma/client";

export type LoginResult = { success: boolean; message?: string };

export async function loginAdmin(formData: FormData): Promise<LoginResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { success: false, message: "Enter a valid email and password." };
  }

  const admin = await prisma.admin.findUnique({ where: { email: parsed.data.email } });
  if (!admin) {
    return { success: false, message: "Invalid email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return { success: false, message: "Invalid email or password." };
  }

  await createSessionCookie({ adminId: admin.id, email: admin.email, name: admin.name });
  return { success: true };
}

export async function logoutAdmin() {
  await destroySessionCookie();
  redirect("/admin/login");
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
  await requireAdmin();

  if (status === "PUBLISHED") {
    const existing = await prisma.researchSubmission.findUnique({ where: { id } });
    if (!existing) throw new Error("Submission not found");

    const slug = existing.slug ?? (await generateUniqueSlug(existing.title ?? existing.fullName, existing.id));

    await prisma.researchSubmission.update({
      where: { id },
      data: { status: "PUBLISHED", publishedAt: new Date(), slug },
    });
  } else {
    await prisma.researchSubmission.update({ where: { id }, data: { status } });
  }

  revalidatePath("/admin/submissions");
  revalidatePath(`/admin/submissions/${id}`);
  revalidatePath("/admin/research");
  revalidatePath("/research");
  revalidatePath("/");
}

export async function updateSubmissionMetadata(
  id: string,
  data: { title: string; abstractText: string; category: string; keywords: string }
) {
  await requireAdmin();
  await prisma.researchSubmission.update({
    where: { id },
    data: {
      title: data.title || null,
      abstractText: data.abstractText || null,
      category: data.category || null,
      keywords: data.keywords ? data.keywords.split(",").map((k) => k.trim()).filter(Boolean) : [],
    },
  });
  revalidatePath(`/admin/submissions/${id}`);
}
