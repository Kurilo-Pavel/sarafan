import "./styles/layout.css";
import type {Metadata} from 'next'
import {StoreProvider} from "@/app/store/StoreProvider";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";
import React from "react";

export const metadata: Metadata = {
  openGraph: {
    title: 'Sarafan - project',
    description: 'online shop',
    images: "@/public/png/big/10.jpg"
  },
  title: "Sarafan",
  description: "internet-shop",
}

const RootLayout = ({children}: { children: React.ReactNode }) => {

  return (

    <StoreProvider>
      <html lang="en">
      <body>
      <Header/>
      {children}
      <Footer/>
      </body>
      </html>
    </StoreProvider>
  );
};
export default RootLayout;