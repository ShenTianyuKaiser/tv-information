import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { ApplicationRoutes } from "./router/router";
import { StyleProvider } from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import {FloatPanel} from "./float-panel";

function App() {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <BrowserRouter>
              <StyleProvider hashPriority="high">
                <ApplicationRoutes />
                <FloatPanel />
              </StyleProvider>
            </BrowserRouter>
          </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
  )
}

export default App
