import { create } from "zustand";

type Actions = {
  setTimeType: (type: TimeState["timeType"]) => void;
  setTime: (time: ITime) => void;
  setModalOpen: (modalOpen: boolean) => void;
};

export type TimeState = {
  timeType: "today" | "tomorrow";
  time: ITime;
  modalOpen: boolean;
  actions: Actions;
};

export const useTimeStore = create<TimeState>((set) => ({
  timeType: "today",
  time: { value: "now", type: "today" },
  modalOpen: false,
  actions: {
    setTimeType: (type) => set({ timeType: type }),
    setTime: (time) => set({ time }),
    setModalOpen: (modalOpen) => set({ modalOpen }),
  },
}));

export const useTimeActions = () => useTimeStore((state) => state.actions);
