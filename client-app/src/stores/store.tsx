import React, { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
};

export const StoreContext = createContext(store);
export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider = ({ children }: { children?: React.ReactNode }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
