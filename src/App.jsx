import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import SingUpPage from "./pages/SignUpPage";
import { GuestRoute, ProtectedRoute } from "./components/RouteWrappers";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        //GuestRoute for Non-registered or logged in users
        <Route element={<GuestRoute />}>
          <Route path="/register" element={<SingUpPage />} />
          <Route path="/login" element={<SignInPage/>} />
        </Route>
        //ProtectedRoute for Logged In users
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="profile" /> //for user profile
        </Route>
        <Route path="*" /> for 404 not found page
      </Routes>
    </AuthProvider>
  );
};

export default App;
