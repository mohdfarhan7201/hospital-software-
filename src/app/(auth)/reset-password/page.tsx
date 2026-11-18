"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Activity, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setSubmitted(true);
    toast.success("Password reset successfully. You can now login.");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <Activity className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Reset Password</h1>
          <p className="text-xs text-[var(--muted-foreground)]">Create a new secure password for your NuvertOS healthcare account</p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Password Changed</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Redirecting to login portal in 2 seconds...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[var(--muted-foreground)]" />
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-2.5 text-[var(--muted-foreground)]" />
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 font-semibold shadow-sm transition-opacity"
              >
                Reset Password
              </button>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-[var(--border)] text-center">
            <Link href="/login" className="text-xs text-[var(--primary)] hover:underline font-semibold flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
