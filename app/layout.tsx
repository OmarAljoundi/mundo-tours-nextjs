import "./globals.css";
import { alfont, englishFont, shekari } from "./fonts";
import ToolBar from "@/components/Layout/tool-bar";
import { cn } from "@/lib/utils";
import Footer from "@/components/Layout/footer";
import Header from "@/components/Layout/header";
import ClientProvider from "@/components/Common/client-provider";
import { getContentData } from "@/lib/fetchers";
import { Notifications } from "@/components/ui/notification";

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
