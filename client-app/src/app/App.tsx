import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStoreContext } from "~/stores/store";
import ScreenLoading from "~/components/ScreenLoading";
import { useAttachScripts } from "../hooks/useAttachScripts";

type Props = {};

const App = () => {
  useAttachScripts();
  const { commonStore, userStore } = useStoreContext();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore.token, userStore]);

  if (!commonStore.appLoaded) return <ScreenLoading />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default observer(App);
