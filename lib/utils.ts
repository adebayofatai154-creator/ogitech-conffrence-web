/** Cloudinary delivery URL that forces a browser download instead of inline display. */
export function toDownloadUrl(url: string) {
  return url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url;
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
}
