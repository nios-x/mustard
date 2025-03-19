import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css"
import Required from "@/Context/Required"
export const metadata: Metadata = {
  title: "Mustard",
  description: "Mustard is a Social Media App (Open Source Currently)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen`}
      >
        <Required>
          <Navbar/>
          {children}
        </Required>
      </body>
    </html>
  );
}
