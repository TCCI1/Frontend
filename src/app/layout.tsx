import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeroGlass - We Build Thinkers, Not Machines",
  description: "Empowering the next generation through innovative technology and creative solutions that actually matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
