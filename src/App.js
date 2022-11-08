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


function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/inicio" element={<MainPage />} />
      <Route path="/condominio" element={<Condominium />} />
      <Route path="/propiedades" element={<Properties />} />
      <Route path="/propietarios" element={<Owners />} />
      <Route path="/gastos-comunes" element={<CommonExpenses />} />
      <Route path="/espacios-comunes" element={<CommonPlaces />} />
      <Route path="/usuarios" element={<Users />} />
    </Routes>
  );
}
export default App;
