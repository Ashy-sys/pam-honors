"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SetupPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Setup token is missing from URL.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/setup-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to set up password.");
        setLoading(false);
        return;
      }

      setSuccess("Password setup successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h1>Set Up Password</h1>
      <p style={{ color: "gray", marginTop: 5, marginBottom: 20 }}>
        Enter your new password below.
      </p>

      {!token && (
        <div style={{ padding: 10, marginBottom: 15, backgroundColor: "#f8d7da", color: "#721c24", borderRadius: 4 }}>
          Missing or invalid setup token in URL.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 10 }}>
          <label style={{ display: "block", marginBottom: 5, fontSize: 14, fontWeight: 500 }}>New Password</label>
          <input
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginTop: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontSize: 14, fontWeight: 500 }}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          style={{ width: "100%", padding: 10, marginTop: 20, backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}
        >
          {loading ? "Setting up..." : "Set Password"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 15, fontSize: 14 }}>{error}</p>
        )}

        {success && (
          <p style={{ color: "green", marginTop: 15, fontSize: 14, fontWeight: 600 }}>{success}</p>
        )}
      </form>
    </div>
  );
}

export default function SetupPasswordPage() {
  return (
    <Suspense fallback={<div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>Loading...</div>}>
      <SetupPasswordForm />
    </Suspense>
  );
}