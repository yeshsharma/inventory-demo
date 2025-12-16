import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage";
import Orders from "../src/components/Dashboard/Orders";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* If not logged in → show login */}
        {!isAuthenticated && <Route path="*" element={<LoginPage />} />}

        {/* If logged in → allow dashboard + orders */}
        {isAuthenticated && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
