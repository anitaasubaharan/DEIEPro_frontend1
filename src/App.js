import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import Equipments from "./components/equipments/equipments";
import Home from "./components/home/home";
import Laboratory from "./components/laboratory/laboratory";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import StudentLogin from "./components/studentLogin/studentLogin";
import CartContextProvider from "./context/cartContextProvider";
import Cart from "./components/cart/cart";
import StudentRegister from "./components/studentRegister/studentRegister";
import AuthContextProvider from "./context/authContextProvider";
import ProtectedRoute from "./route/protectedRoute";
import MainBox from "./components/MainLogin/MainBox";
import LecturerLogin from "./components/LecturerLogin/LecturerLogin";
import OfficerLogin from "./components/technicalofficer/OfficerLogin";
import OfficerRegister from "./components/OfficerRegister/OfficerRegister";
import LecturerRegister from "./components/LecturerRegister/LecturerRegister";
import Home2 from "./components/Home2/Home2";
import Home3 from "./components/Home3/Home3";
import Requests from "./components/Requests/Requests";
import NextRequest from "./components/NextRequest/NextRequest";
function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Router>
          <div className="App">
            <HelmetProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Home"
                  element={
                    <ProtectedRoute>
                      <Home2 />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Officer"
                  element={
                    <ProtectedRoute>
                      <Home3 />
                    </ProtectedRoute>
                  }
                />
                <Route path="/requests" element={<Requests />} />
                <Route path="/next/:id" element={<NextRequest />} />
                <Route path="/login" element={<MainBox />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/student-register" element={<StudentRegister />} />

                <Route path="/lecturer-login" element={<LecturerLogin />} />
                <Route
                  path="/lecturer-register"
                  element={<LecturerRegister />}
                />

                <Route path="/officer-login" element={<OfficerLogin />} />
                <Route path="/officer-register" element={<OfficerRegister />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/password/reset/:token"
                  element={<ResetPassword />}
                />

                <Route
                  path="/laboratory"
                  element={
                    <ProtectedRoute>
                      <Laboratory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/laboratory/:labId"
                  element={
                    <ProtectedRoute>
                      <Equipments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </HelmetProvider>
          </div>
        </Router>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
