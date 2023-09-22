export const revalidate = 0;
import "./globals.css";
import { alfont, englishFont, shekari } from "./fonts";
import ToolBar from "@/components/Layout/tool-bar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Layout/footer";
import Header from "@/components/Layout/header";
import ClientProvider from "@/components/Common/client-provider";
import { getContentData } from "@/lib/fetchers";
import { Notifications } from "@/components/ui/notification";
import Script from "next/script";
import { Suspense } from "react";
import Analytics from "@/components/Layout/analytics";
import { GTM_ID } from "@/lib/gtm";

export async function generateMetadata() {
  const data = await getContentData();
  return {
    title: data?.content?.home?.seoTitle,
    description: data?.content?.home?.seoDescription,
    keywords: data?.content?.home?.seoTags || "",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getContentData();
  return (
    <html lang="ar" dir="rtl">
      <body
        className={cn(alfont.variable, englishFont.variable, shekari.variable)}
      >
        <Script strategy="beforeInteractive" id="gtm-script" defer={true}>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PZZKT2Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Notifications position={"topRight"}>
          <ClientProvider content={data.content}>
            <ToolBar />
            <Header />
            {children}
            <Footer />
          </ClientProvider>
        </Notifications>
      </body>
    </html>
  );
}
