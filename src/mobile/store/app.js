import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStoreMob = create(
  immer((set) => ({
    activeApp: null, // null means we are on the home screen
    appData: null,

    openApp: (appId, data = null) =>
      set((state) => {
        state.activeApp = appId;
        state.appData = data;
      }),

    closeApp: () =>
      set((state) => {
        state.activeApp = null;
        state.appData = null;
      }),
  }))
);

export default useWindowStoreMob;
