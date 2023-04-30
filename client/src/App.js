import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyLogistic from "./pages/ApplyLogistic";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/Admin/Userslist";
import LogisticsList from "./pages/Admin/LogisticsList";
import Profile from "./pages/Logistic/Profile";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import LogisticAppointments from "./pages/Logistic/LogisticAppointments";
import Patient from "./pages/Admin/Patient";
import Patientlist from "./pages/Admin/Patientlist";
import View from "./pages/Admin/View";
import Update from "./pages/Admin/Update";
import Main from "./components/Main";
import OrderStatus from "./pages/OrderTracking";
import ApprovedBookings from "./pages/Logistic/ApprovedBooking";
import TraderProfile from "./pages/TraderProfile";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/show"
          element={
            <PublicRoute>
              <Main />
            </PublicRoute>
          }
        />
        <Route
        path="/orderTracking"
        element={
          <PublicRoute>
            <OrderStatus />
          </PublicRoute>
        }
      />
        <Route
          path="/apply-logistic"
          element={
            <ProtectedRoute>
              <ApplyLogistic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userslist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/logisticslist"
          element={
            <ProtectedRoute>
              <LogisticsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-patient"
          element={
            <ProtectedRoute>
              <Patientlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logistic/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile/:userId"
          element={
            <ProtectedRoute>
              <TraderProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-appointment/:logisticId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logistic/appointments"
          element={
            <ProtectedRoute>
              <LogisticAppointments />
            </ProtectedRoute>
          }
        />

        <Route
        path="/logistic/approved"
        element={
          <ProtectedRoute>
            <ApprovedBookings />
          </ProtectedRoute>
        }
      /> 
        <Route
          path="/register-patient"
          element={
            <ProtectedRoute>
              <Patient />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
