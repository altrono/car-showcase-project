import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "./components";



export const metadata: Metadata = {
  title: "Car Rental Project @copyright altrono",
  description: "Discover the best cars in the world with the power Nextjs and Rapid AI. by Altrono ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        
          {children}  
       
        <Footer />
        
        </body>
    </html>
  );
}
