import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { HospitalProvider } from "@/contexts/HospitalContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "NuvertOS — Hospital Operating System (HIS / HMS)",
  description:
    "Enterprise-grade Hospital Operating System for multi-speciality healthcare administration, clinical workflow, OPD/IPD, EMR, OT, Pharmacy, and Billing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="nuvertos-theme"
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <HospitalProvider>
              {children}
              <Toaster position="top-right" richColors closeButton />
            </HospitalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
