import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { MainPage } from "./pages";
import "./App.css";
import { LoginPage } from "./pages/login-page";

const queryClient = new QueryClient();
function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
