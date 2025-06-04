// src/store/useAddressStore.ts
import { create } from "zustand";

interface IAddress {
  id: string;
  name: string;
}
type AddressStore = {
  from: {
    region: IAddress | null;
    district: IAddress | null;
  };
  to: {
    region: IAddress | null;
    district: IAddress | null;
  };
  isDrawerOpen: boolean;
  activeType: "from" | "to";
  addressType: "region" | "district";
  actions: {
    setRegion: (type: "from" | "to", region: IAddress | null) => void;
    setDistrict: (type: "from" | "to", district: IAddress | null) => void;
    setFrom: (from: AddressStore["from"]) => void;
    setTo: (to: AddressStore["to"]) => void;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
    setActiveType: (activeType: "from" | "to") => void;
    setAddressType: (addressType: "region" | "district") => void;
    clearAddresses: () => void;
    clearAddress: (type: "from" | "to") => void;
  };
};

export const useAddressStore = create<AddressStore>((set) => ({
  from: {
    region: null,
    district: null,
  },
  to: {
    region: null,
    district: null,
  },
  isDrawerOpen: false,
  activeType: "from",
  addressType: "region",
  actions: {
    setRegion: (type, region) =>
      set((state) => ({ [type]: { ...state[type], region } })),
    setDistrict: (type, district) =>
      set((state) => ({ [type]: { ...state[type], district } })),
    setFrom: (from) => set({ from }),
    setTo: (to) => set({ to }),

    setIsDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
    setActiveType: (activeType) => set({ activeType }),
    setAddressType: (addressType) => set({ addressType }),
    clearAddresses: () => set({ from: { region: null, district: null }, to: { region: null, district: null } }),
    clearAddress: (type) => set({ [type]: { region: null, district: null } }),
  },
}));
