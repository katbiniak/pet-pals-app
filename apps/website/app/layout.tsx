import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Pals",
  description: "The best pet booking platform for dogs, cats, and pigs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className='h-full antialiased'
    >
      <body className="min-w-full min-h-full bg-white">{children}</body>
    </html>
  );
}
