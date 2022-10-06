import React, { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import { CommentStore } from "./commentStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
	activityStore: ActivityStore;
	commonStore: CommonStore;
	userStore: UserStore;
	profileStore: ProfileStore;
	commentStore: CommentStore;
}

export const store: Store = {
	activityStore: new ActivityStore(),
	commonStore: new CommonStore(),
	userStore: new UserStore(),
	profileStore: new ProfileStore(),
	commentStore: new CommentStore(),
};

export const StoreContext = createContext(store);
export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider = ({ children }: { children?: React.ReactNode }) => {
	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
