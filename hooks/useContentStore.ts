import { IContent } from "@/interface/Content";
import { create } from "zustand";

interface ContentState {
  content: IContent | undefined;
  setContent: (content: IContent) => void;
  discardContent: () => void;
}

export const useContentStore = create<ContentState>()((set) => ({
  content: undefined,
  setContent: (content) => set((state) => ({ content: content })),
  discardContent: () => set(() => ({ content: undefined })),
}));
