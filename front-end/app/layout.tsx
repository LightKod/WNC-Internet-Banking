import type { Metadata } from "next";
import { figtree } from "./ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Bankit! | Internet Banking',
    default: 'Bankit! | Internet Banking'
  },
  description: "Bankit! - Internet Banking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
