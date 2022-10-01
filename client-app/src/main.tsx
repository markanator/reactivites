import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/Router";
import { StoreContextProvider } from "./stores/store";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <StoreContextProvider>
      <ChakraProvider resetCSS>
        <RouterProvider router={router} />
      </ChakraProvider>
    </StoreContextProvider>
  </>
);
