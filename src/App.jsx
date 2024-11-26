import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

import { MainPage } from "./components/MainPage";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) =>
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 5000,
        }),
    },
  },
});

const theme = createTheme();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{ body: { margin: 0, fontFamily: "Ubuntu" } }}
          />
          <MainPage />
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
