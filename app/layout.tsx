import './globals.css'
import { alfont, englishFont, shekari } from './fonts'
import { cn } from '@/lib/utils'
import ClientProvider from '@/components/common/client-provider'
import { getContentData } from '@/lib/operations'
import { Notifications } from '@/components/ui/notification'
import Script from 'next/script'
import { GTM_ID } from '@/lib/gtm'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { ThemeProvider } from '@/provider/theme-provider'
import { ModalProvider } from '@/provider/modal-provider'
import { Toaster } from 'sonner'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const responseData = await getContentData()
  return (
    <html lang="ar" dir="rtl">
      <body className={cn(alfont.variable, englishFont.variable, shekari.variable)}>
        <Script strategy="beforeInteractive" id="gtm-script">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PZZKT2Q"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            <Toaster position="top-right" expand={true} richColors />
            <Notifications position={'topRight'}>
              <ClientProvider content={responseData}>{children}</ClientProvider>
            </Notifications>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
