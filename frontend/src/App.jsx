import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import GuestRoute from "./routes/GuestRoute";
import UserRoute from "./routes/UserRoute";
import ScrollToTop from "./pages/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
              <Route path="/" element={<Home />} />
            
            {/* Guest Routes */}
            <Route element={<GuestRoute />}>
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
            </Route>

            {/* Private Routes */}
              <Route element={<UserRoute />}>
                {/* <Route path="/profile" element={<Profile />} /> */}
              </Route>
          </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
