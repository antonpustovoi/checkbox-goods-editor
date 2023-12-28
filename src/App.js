import { GlobalStyles } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

import { MainPage } from "./components/MainPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <GlobalStyles styles={{ body: { margin: 0, fontFamily: "Ubuntu" } }} />
        <MainPage />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
