import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import theme from "~/ui-shared/theme";
import { UserProvider } from "./contexts/UserIdContext";
import "modern-normalize";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <div>From popup: Hello World!</div>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
