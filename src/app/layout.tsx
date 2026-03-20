import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "SHIELD | Advanced Threat Intelligence",
  description: "Enterprise-grade cybersecurity incident reporting and analysis dashboard.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased text-white bg-calm-green min-h-screen selection:bg-cyber-green/30 selection:text-white`}
      >
        <div className="relative min-h-screen flex flex-col z-10">
          <Header />
          <main className="flex-grow pt-40 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        
        {/* Subtle background glow */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,65,0.03)_0%,transparent_50%)] pointer-events-none -z-10" />
      </body>
    </html>
  );
}
