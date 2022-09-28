import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { router } from "./app/Router";
import { StoreContextProvider } from "./stores/store";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <StoreContextProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </StoreContextProvider>
  </>
);
