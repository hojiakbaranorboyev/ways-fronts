// src/store/useSeatStore.ts
import { create } from "zustand";

export type SeatKey = "front" | "backLeft" | "backMiddle" | "backRight";
export type Seat = { type: SeatKey; price: number; isOn: boolean, discount:number };
type SeatStore = {
  seats: Record<SeatKey, null | Seat>;
  toggleSeat: (seat: Seat) => void;
};

export const useSeatStore = create<SeatStore>((set) => ({
  seats: {
    front: null,
    backLeft: null,
    backMiddle: null,
    backRight: null,
  },
  toggleSeat: (seat) =>
    set((state) => ({
      seats: {
        ...state.seats,
        [seat.type]: seat?.isOn ? seat : null,
      },
    })),
}));
