import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MainPage } from "./components/MainPage";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <MainPage />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
