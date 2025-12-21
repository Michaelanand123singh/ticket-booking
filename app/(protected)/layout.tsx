import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Toaster from "@/components/ui/Toaster";
import AuthGuard from "@/components/shared/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard - Viagosport",
    description: "Manage your sports experiences and account.",
};

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                {/* <AuthGuard> */}
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <Toaster />
                {/* </AuthGuard> */}
            </body>
        </html>
    );
}
