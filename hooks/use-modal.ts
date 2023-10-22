import { create } from "zustand";

export interface ModalProps {
  isOpenTourType: boolean;
  isOpenDestination: boolean;
  isOpenDestinationTours: boolean;
  isOpenSlide: boolean;
  isOpenFaq: boolean;
  isOpen: boolean;
  isOpenHotel: boolean;
  isOpenOffice: boolean;
  data?: any;

  onOpen: (data?: any) => void;
  onOpenTourType: (data?: any) => void;
  onOpenSlide: (data?: any) => void;
  onOpenDestination: (data?: any) => void;
  onOpenDestinationOffice: () => void;
  onOpenHotel: (data?: any) => void;
  onOpenFaq: (data?: any) => void;
  onOpenDestinationTours: (data?: any) => void;
  onOpenOffice: (data?: any) => void;
  onClose: () => void;
}

export const useModal = create<ModalProps>((set) => ({
  isOpen: false,
  isOpenHotel: false,
  isOpenTourType: false,
  isOpenDestination: false,
  isOpenDestinationTours: false,
  isOpenSlide: false,
  isOpenFaq: false,
  isOpenOffice: false,
  onOpenHotel: (data?: any) => set({ isOpenHotel: true, data: data }),
  onOpenFaq: (data?: any) => set({ isOpenFaq: true, data: data }),
  onOpenDestinationTours: (data?: any) =>
    set({ isOpenDestinationTours: true, data: data }),
  onOpenDestination: (data?: any) =>
    set({ isOpenDestination: true, data: data }),
  onOpenSlide: (data?: any) => set({ isOpenSlide: true, data: data }),
  onOpen: (data?: any) => set({ isOpen: true, data: data }),
  onOpenTourType: (data?: any) => set({ isOpenTourType: true, data: data }),
  onOpenDestinationOffice: () =>
    set({ isOpenDestination: true, data: { is_office: true } }),
  onOpenOffice: (data?: any) => set({ data: data, isOpenOffice: true }),
  onClose: () =>
    set({
      isOpenFaq: false,
      isOpenDestinationTours: false,
      isOpenTourType: false,
      isOpenDestination: false,
      isOpenOffice: false,
      isOpen: false,
      data: undefined,
      isOpenSlide: false,
      isOpenHotel: false,
    }),
}));
