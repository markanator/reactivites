import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/Layouts/styles.css";
import { StoreContextProvider } from "./stores/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ChakraProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </ChakraProvider>
  </>
);
