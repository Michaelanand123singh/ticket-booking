import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Toaster from "@/components/ui/Toaster";
import AuthGuard from "@/components/shared/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin dashboard for sports events platform.",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen bg-[#11212D] text-white`}>
                {/* <AuthGuard>
                </AuthGuard> */}
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
