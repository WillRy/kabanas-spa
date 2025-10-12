import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/authentication/ProtectedRoutes.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Bookings from "./pages/Bookings.jsx";
import Account from "./pages/Account.jsx";
import Properties from "./pages/Properties.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
             <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              {/* <Route path="/bookings/:bookingId" element={<Booking />} /> */}
              {/* <Route path="/checkin/:bookingId" element={<Checkin />} /> */}
              <Route path="/properties" element={<Properties />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
