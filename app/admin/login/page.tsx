"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { loginAdmin } from "../actions";

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(formData: FormData) {
        setError(null);

        startTransition(async () => {
            const result = await loginAdmin(formData);

            if (!result.success) {
                setError(result.message ?? "Something went wrong. Please try again.");
                return;
            }

            router.push(searchParams.get("from") ?? "/admin");
            router.refresh();
        });
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--off)",
            }}
        >
            <div className="card" style={{ width: 380, padding: 36 }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 28,
                    }}
                >
                    <Image src="/logo.jpeg" alt="OGITECH logo" width={36} height={36} />
                    <div
                        style={{
                            fontFamily: "var(--font-h)",
                            fontWeight: 700,
                            fontSize: 14,
                            color: "var(--navy)",
                        }}
                    >
                        OGITECH SET · Admin Portal
                    </div>
                </div>

                {error && (
                    <div
                        className="toast error"
                        style={{ marginBottom: 20, maxWidth: "none" }}
                    >
                        {error}
                    </div>
                )}

                <form action={handleSubmit}>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" required autoFocus />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <span className="spinner" />
                                Signing in…
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div>Loading…</div>}>
            <AdminLoginForm />
        </Suspense>
    );
}