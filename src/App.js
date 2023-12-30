import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import { MainPage } from "./components/MainPage";

const queryClient = new QueryClient();

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
