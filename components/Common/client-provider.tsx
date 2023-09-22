"use client";
import { useContentStore } from "@/hooks/useContentStore";
import { IContent } from "@/interface/Content";
import { FC, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import TagManager from "react-gtm-module";
import { GTM_ID } from "@/lib/gtm";

const ClientProvider: FC<{ children: React.ReactNode; content: IContent }> = ({
  children,
  content,
}) => {
  const setContent = useContentStore((state) => state.setContent);
  setContent(content);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};

export default ClientProvider;
