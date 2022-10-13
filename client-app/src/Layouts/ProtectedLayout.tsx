import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStoreContext } from "~/stores/store";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const {
		userStore: { isLoggedIn },
	} = useStoreContext();
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to="/" state={{ from: location.pathname }} replace />;
	}

	return <>{children}</>;
}
