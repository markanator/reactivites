import React, { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
  activityStore: ActivityStore;
  commentStore: CommonStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commentStore: new CommonStore(),
};

export const StoreContext = createContext(store);
export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
