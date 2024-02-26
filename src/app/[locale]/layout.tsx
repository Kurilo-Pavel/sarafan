import "./styles/layout.css";
import type {Metadata} from 'next'
import {StoreProvider} from "@/src/app/[locale]/store/StoreProvider";
import Header from "@/src/app/[locale]/components/header/Header";
import Footer from "@/src/app/[locale]/components/footer/Footer";
import React from "react";
import {NextIntlClientProvider, useMessages} from "next-intl";
import Language from "@/src/app/[locale]/components/Language";

export const metadata: Metadata = {
  openGraph: {
    title: 'Sarafan - project',
    description: 'online shop',
    images: "/icon.png"
  },
  title: "Sarafan",
  description: "internet-shop",
}

const RootLayout = ({children, params: {locale}}: {
  children: React.ReactNode,
  params: { locale: string };
}) => {

  const messages = useMessages();

  return (
    <StoreProvider>
      <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>
        <Header/>
        <Language/>
        {children}
        <Footer/>
        </body>
      </NextIntlClientProvider>
      </html>
    </StoreProvider>
  );
};
export default RootLayout;