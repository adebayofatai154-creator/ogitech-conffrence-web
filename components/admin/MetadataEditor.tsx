"use client";

import { useState, useTransition } from "react";
import { updateSubmissionMetadata } from "@/app/admin/actions";

export function MetadataEditor({
  id, title, abstractText, category, keywords,
}: { id: string; title: string; abstractText: string; category: string; keywords: string[] }) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(formData: FormData) {
    setSaved(false);
    startTransition(async () => {
      await updateSubmissionMetadata(id, {
        title: String(formData.get("title") ?? ""),
        abstractText: String(formData.get("abstractText") ?? ""),
        category: String(formData.get("category") ?? ""),
        keywords: String(formData.get("keywords") ?? ""),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <form action={handleSubmit}>
      {saved && <div className="toast" style={{ marginBottom: 16, maxWidth: "none" }}>Changes saved.</div>}
      <div className="field">
        <label htmlFor="title">Research title</label>
        <input id="title" name="title" type="text" defaultValue={title} placeholder="For display on the public research page" />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <input id="category" name="category" type="text" defaultValue={category} placeholder="e.g. Mechanical Engineering" />
      </div>
      <div className="field">
        <label htmlFor="abstractText">Abstract</label>
        <textarea id="abstractText" name="abstractText" rows={5} defaultValue={abstractText} />
      </div>
      <div className="field">
        <label htmlFor="keywords">Keywords</label>
        <input id="keywords" name="keywords" type="text" defaultValue={keywords.join(", ")} placeholder="Comma separated" />
      </div>
      <button type="submit" className="btn btn-outline" disabled={isPending}>
        {isPending ? (<><span className="spinner" style={{ borderTopColor: "var(--navy)", borderColor: "rgba(3,5,90,.3)" }} />Saving…</>) : "Save Changes"}
      </button>
    </form>
  );
}
