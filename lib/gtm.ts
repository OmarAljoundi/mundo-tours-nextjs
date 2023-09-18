type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM;

export const pageview = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    debugger;
    window.dataLayer.push({
      event: "pageview",
      page: url,
    });
    console.log({
      success: true,
      event: "pageview",
      page: url,
    });
  } else {
    console.log({
      success: false,
      event: "pageview",
      page: url,
    });
  }
};

export const submitEventForm = (url: string) => {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      success: true,
      event: "registered",
      page: url,
    });
  } else {
    console.log({
      success: false,
      event: "registered",
      page: url,
    });
  }
};
