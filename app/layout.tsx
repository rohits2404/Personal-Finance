import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Walletly",
    description: "Personal Finance Visualizer A simple web application for tracking personal finances.",
    icons: {
        icon: "/logo/logo.png"
    }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body
            className={`${inter.className} antialiased`}
            >
                {children}
                <Toaster/>
            </body>
        </html>
    );
}