import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box, Button, ChakraProvider, Icon } from "@chakra-ui/react";
import { ChatPage, MainPage, SettingsPage, LoginPage } from "./pages";
import PrivateRoutes from "./components/protected-routes";
import { DragHandleIcon, EmailIcon, SettingsIcon } from "@chakra-ui/icons";
import "./App.css";

const queryClient = new QueryClient();

export default function App() {
  const navigate = useNavigate();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
          {sessionStorage.getItem("token") && (
            <Box
              bg="pink.300"
              className="footer"
              display="flex"
              justifyContent="space-evenly"
              p="10px"
            >
              <Button className="menu-btn" onClick={() => navigate("/")}>
                <Icon as={DragHandleIcon} /> Home
              </Button>
              <Button className="menu-btn" onClick={() => navigate("/chat")}>
                <Icon as={EmailIcon} /> Chat
              </Button>
              <Button
                className="menu-btn"
                onClick={() => navigate("/settings")}
              >
                <Icon as={SettingsIcon} />
                Settings
              </Button>
            </Box>
          )}
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
