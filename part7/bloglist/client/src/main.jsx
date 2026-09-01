import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GlobalStyles } from "@mui/material";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStyles
        styles={{
          body: {
            fontFamily: "'system-ui', 'sans-serif'",
          },
        }}
      />
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
