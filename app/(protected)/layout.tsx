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
            <body className={`${poppins.variable} font-sans ${libreBaskerville.variable} flex flex-col min-h-screen`}>
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
