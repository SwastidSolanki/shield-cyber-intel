import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import CyberCursor from "@/components/Effects/CyberCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "SHIELD | Advanced AI Threat Intelligence & Neural Defense",
  description: "Enterprise-grade cybersecurity incident reporting and analysis dashboard.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "SHIELD | Advanced AI Threat Intelligence & Neural Defense",
    description: "Enterprise-grade cybersecurity incident reporting and analysis dashboard.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHIELD | Advanced Threat Intelligence",
    description: "Enterprise-grade cybersecurity incident reporting and analysis dashboard.",
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased text-white bg-cyber-black min-h-screen selection:bg-cyber-green/30 selection:text-white overflow-x-hidden`}
      >
        <CyberCursor />
        
        {/* Animated Background Infrastructure */}
        <div className="animated-grid" />
        <div className="scanline" />
        
        <div className="relative min-h-screen flex flex-col z-10">
          <Header />
          <main className="flex-grow pt-40 md:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          
          {/* Status Indicator */}
          <div className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-cyber-black/80 border border-cyber-green/20 backdrop-blur-md">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse opacity-50" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyber-green animate-ping opacity-75" />
            </div>
            <span className="text-[10px] text-cyber-green font-mono font-bold uppercase tracking-[0.2em]">
              System Active
            </span>
          </div>
        </div>
        
        {/* Global ambient glow */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,65,0.05)_0%,transparent_60%)] pointer-events-none -z-10" />
      </body>
    </html>
  );
}
