"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileDropzone } from "./FileDropzone";
import { submitResearch } from "@/app/actions/submission";
import { IconAlert } from "@/components/site/Icons";
import { siteConfig } from "@/lib/site-config";

export function SubmissionForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setFormError(null);
    setFieldErrors({});
    setFileError(undefined);

    if (!file) {
      setFileError("Please attach your abstract or paper.");
      return;
    }
    if (file.size > siteConfig.maxUploadMb * 1024 * 1024) {
      setFileError(
        `This file is larger than ${siteConfig.maxUploadMb} MB. Please upload a smaller file.`,
      );
      return;
    }
    formData.set("file", file);

    startTransition(async () => {
      try {
        const result = await submitResearch(formData);
        if (!result.success) {
          setFormError(result.message);
          if (result.fieldErrors) setFieldErrors(result.fieldErrors);
          return;
        }
        const params = new URLSearchParams({
          name: result.fullName,
          date: result.submittedAt,
          ref: result.submissionId,
        });
        router.push(`/submit/success?${params.toString()}`);
      } catch {
        setFormError(
          "We couldn’t reach the server. Please check your connection and try again — your details are still filled in.",
        );
      }
    });
  }

  return (
    <form
      action={handleSubmit}
      className="s-form"
      noValidate
      aria-busy={isPending}
    >
      <h2 className="s-form__title">Submit your research</h2>
      <p className="s-form__sub">
        Tell us who you are, then attach your abstract or complete work.{" "}
        <a
          className="s-only-mobile"
          href="#requirements"
          style={{ fontWeight: 600 }}
        >
          See paper requirements
        </a>
      </p>

      {formError && (
        <div className="s-alert" role="alert">
          <IconAlert />
          <div>
            <strong>{formError}</strong>
            {!isPending && (
              <div style={{ marginTop: 4 }}>
                Press “Submit Paper” to try again.
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`field ${fieldErrors.fullName ? "error" : ""}`}>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="e.g. Adaeze Okonkwo"
          required
          disabled={isPending}
          aria-invalid={!!fieldErrors.fullName}
          aria-describedby={fieldErrors.fullName ? "fullName-err" : undefined}
        />
        {fieldErrors.fullName && (
          <div id="fullName-err" className="hint">
            {fieldErrors.fullName}
          </div>
        )}
      </div>

      <div className={`field ${fieldErrors.email ? "error" : ""}`}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="e.g. name@xyz.com"
          required
          disabled={isPending}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-err" : undefined}
        />
        {fieldErrors.email && (
          <div id="email-err" className="hint">
            {fieldErrors.email}
          </div>
        )}
      </div>

      <div className={`field ${fieldErrors.phoneNumber ? "error" : ""}`}>
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. 0803 000 0000"
          required
          disabled={isPending}
          aria-invalid={!!fieldErrors.phoneNumber}
          aria-describedby={fieldErrors.phoneNumber ? "phone-err" : undefined}
        />
        {fieldErrors.phoneNumber && (
          <div id="phone-err" className="hint">
            {fieldErrors.phoneNumber}
          </div>
        )}
      </div>

      <div className="field">
        <label>Research work</label>
        <FileDropzone
          file={file}
          onChange={(f) => {
            setFile(f);
            setFileError(undefined);
          }}
          error={fileError}
          disabled={isPending}
        />
      </div>

      {isPending && (
        <div role="status" style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>
            Uploading your document securely — please keep this page open.
          </p>
          <div className="s-progress" aria-hidden="true" />
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ width: "100%" }}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span className="spinner" />
            Submitting…
          </>
        ) : (
          "Submit Paper"
        )}
      </button>
      <p className="s-consent">
        By submitting, you confirm the work is your own and follows the
        submission requirements. Submission does not guarantee acceptance or
        publication.
      </p>
    </form>
  );
}
