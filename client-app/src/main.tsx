import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./app/Layouts/App";
import "./app/Layouts/styles.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={client}>
    <ChakraProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </ChakraProvider>
  </QueryClientProvider>
);
