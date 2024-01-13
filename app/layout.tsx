export const dynamic = 'force-dynamic'
import './globals.css'
import { alfont, englishFont, shekari } from './fonts'
import { cn } from '@/lib/utils'
import ClientProvider from '@/components/shared/client-provider'
import { Notifications } from '@/components/ui/notification'
import Script from 'next/script'
import { GTM_ID } from '@/lib/gtm'
import { ReactQueryProvider } from '@/provider/react-query-provider'
import { ModalProvider } from '@/provider/modal-provider'
import { Toaster } from 'sonner'
import Scroll from '@/provider/scroll-provider'
import PrefetchCountry from './prefetch-country'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cn(alfont.variable, englishFont.variable, shekari.variable)}>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
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
          <Scroll />
          <ModalProvider />
          <Toaster position="top-right" expand={true} richColors />
          <PrefetchCountry>
            <Notifications position={'topRight'}>
              <ClientProvider>{children}</ClientProvider>
            </Notifications>
          </PrefetchCountry>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
