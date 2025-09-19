// src/app/layout.js
import "./globals.css";
import {DM_Sans } from 'next/font/google';
import next from "next";

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'], 
  variable: '--font-dm-sans',
});


export const metadata = {
  title: "Pehnawa",
  description: "Partner Onboarding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>{children}</body>
    </html>
  );
}
