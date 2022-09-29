import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./styles/global.css";
import { router } from "./app/Router";
import { StoreContextProvider } from "./stores/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <StoreContextProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </StoreContextProvider>
  </>
);
