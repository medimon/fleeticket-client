import Button from "@mui/material/Button";
import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ColorModeContext, themeSettings, useMode } from "../theme.js";

import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">
        oups quelque chose s'est mal passé :(
      </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Rafraîchir?
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  //   const [themeddd, colorMode] = useMode()
  const colorModeValue = useMode(); // Assuming this returns the [theme, colorMode] array
  const theme = createTheme(themeSettings("dark"));
  const queryClient = new QueryClient();
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          {/* <Spinner size="xl" /> */}
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ColorModeContext.Provider value={colorModeValue as any}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                  {/* {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />} */}
                  <ReactQueryDevtools />
                  {/* <AuthProvider> */}
                  <Router>{children}</Router>
                  {/* </AuthProvider> */}
                </QueryClientProvider>
              </HelmetProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </LocalizationProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

// export default App
