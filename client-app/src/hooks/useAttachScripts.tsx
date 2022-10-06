import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useAttachScripts = () => {
	const nav = useNavigate();
	const toast = useToast();
	if (!window.navigate) {
		window.navigate = nav;
	}

	if (!window.toast) {
		window.toast = toast;
	}
};
