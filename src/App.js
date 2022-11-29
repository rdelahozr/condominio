import * as React from "react";
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import MainPage from "./pages/Dashboard/MainPage";
import CommonExpenses from "./pages/CommonExpenses/CommonExpenses";
import Condominium from "./pages/Condominium/Condominium";
import Properties from "./pages/Properties/Properties";
import Owners from "./pages/Owners/Owners";
import CommonPlaces from "./pages/CommonPlaces/CommonPlaces";
import Users from "./pages/Users/Users";
import { UserContextProvider, useUserContext } from "./context/userContext";
import PrivateRoute from "./common/PrivateRoute";
import Reservations from "./pages/Reservation/Reservation";


function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/condominios" element={<PrivateRoute><Condominium /></PrivateRoute>} />
        <Route path="/propiedades" element={<PrivateRoute><Properties /></PrivateRoute>} />
        <Route path="/propietarios" element={<PrivateRoute><Owners /></PrivateRoute>} />
        <Route path="/gastos-comunes" element={<PrivateRoute><CommonExpenses /></PrivateRoute>} />
        <Route path="/espacios-comunes" element={<PrivateRoute><CommonPlaces /></PrivateRoute>} />
        <Route path="/reservas" element={<PrivateRoute><Reservations /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Users /></PrivateRoute>} />
      </Routes>
    </UserContextProvider>

  );
}
export default App;
