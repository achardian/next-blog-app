import { AuthModal, Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burogu | Blog App",
  description: "Burogu is a blog app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${font.className} bg-white dark:bg-[#2f2b3a]`}>
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            storageKey='burogu-theme'
            defaultTheme='dark'
            enableSystem
          >
            <Navbar />
            {children}
            <AuthModal />
            <ToasterProvider />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
