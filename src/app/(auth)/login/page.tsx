"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeartPulse,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@nuvertos.health");
  const [password, setPassword] = useState("Hospital@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("Hospital Admin");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const demoAccounts: { role: UserRole; email: string; name: string }[] = [
    { role: "Hospital Admin", email: "admin@nuvertos.health", name: "Dr. Vikramaditya Singhal" },
    { role: "Super Admin", email: "cio@nuvertos.health", name: "Kavita Deshmukh" },
    { role: "Doctor", email: "cardiology@nuvertos.health", name: "Dr. Arvind Subramaniam" },
    { role: "Receptionist", email: "frontdesk@nuvertos.health", name: "Sneha Varma" },
    { role: "Nurse", email: "nurse.ccu@nuvertos.health", name: "Sr. Marykutty Thomas" },
    { role: "Accountant", email: "accounts@nuvertos.health", name: "Ramesh Kulkarni" },
    { role: "Pharmacist", email: "pharmacy@nuvertos.health", name: "Deepak Joshi" },
    { role: "Lab Technician", email: "lab@nuvertos.health", name: "Pooja Patil" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, selectedRole);
      toast.success(`Welcome to NuvertOS, ${selectedRole}!`);
      router.push("/dashboard");
    }, 600);
  };

  const selectDemoRole = (role: UserRole, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    setPassword("Hospital@2026");
    toast.info(`Selected demo credentials for: ${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white shadow-lg mb-4">
          <HeartPulse className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Nuvert<span className="text-blue-600">OS</span>
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Next-Generation Enterprise Hospital Operating System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-200 dark:border-slate-800">
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Staff Email / Medical ID
              </label>
              <div className="mt-1 relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="mt-1 relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                />
                Remember my terminal session
              </label>
              <Link
                href="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating terminal...</span>
              ) : (
                <>
                  <span>Sign In as {selectedRole}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Quick Demo Accounts (Click to test role):
              </span>
              <span className="text-[10px] text-slate-400">Frontend Simulation</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {demoAccounts.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => selectDemoRole(item.role, item.email)}
                  className={`p-2 rounded-lg text-left text-xs border transition-all ${
                    selectedRole === item.role
                      ? "border-blue-500 bg-blue-50/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold shadow-xs"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <p className="truncate font-medium">{item.role}</p>
                  <p className="text-[10px] opacity-75 truncate">{item.name.split(" ")[0]}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
