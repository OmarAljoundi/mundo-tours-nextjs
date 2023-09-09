import localFont from "next/font/local";

export const alfont = localFont({
  src: [
    {
      path: "./font/alfont_com_AlFont_com_Swissra-Bold.otf",
      weight: "700",
    },
    {
      path: "./font/alfont_com_AlFont_com_Swissra-Condensed-Heavy-1.otf",
      weight: "900",
    },
    {
      path: "./font/alfont_com_AlFont_com_Swissra-Normal-1.otf",
      weight: "400",
    },
    {
      path: "./font/alfont_com_AlFont_com_Swissra-Thin-1.otf",
      weight: "100",
    },
  ],
  variable: "--font-primary",
});

export const englishFont = localFont({
  src: "./font/Montserrat-SemiBold.ttf",
  variable: "--font-english",
});

export const shekari = localFont({
  src: "./font/shekari.ttf",
  variable: "--font-secondary",
});
