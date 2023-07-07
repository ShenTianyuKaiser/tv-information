import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { ApplicationRoutes } from "./router/router";

function App() {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <BrowserRouter>
              <ApplicationRoutes />
            </BrowserRouter>
          </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
  )
}

export default App
