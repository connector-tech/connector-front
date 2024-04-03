import {
  BrowserRouter,
  Navigate,
  redirect,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { MainPage } from "./pages";
import "./App.css";
import { LoginPage } from "./pages/login-page";
import { useEffect, useState } from "react";
import PrivateRoutes from "./components/protected-routes";

const queryClient = new QueryClient();

const authRoutes = [<Route path="/" element={<MainPage />} />];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuthenticated(true);
  }, []);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<MainPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
