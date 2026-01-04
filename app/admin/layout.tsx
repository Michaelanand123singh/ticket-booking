import type { Metadata } from "next";
import { Poppins, Libre_Baskerville } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Toaster from "@/components/ui/Toaster";
import AuthGuard from "@/components/shared/AuthGuard";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

const libreBaskerville = Libre_Baskerville({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-libre-baskerville",
});

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
            <body className={`${poppins.variable} font-sans ${libreBaskerville.variable} min-h-screen bg-[#11212D] text-white`}>
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
