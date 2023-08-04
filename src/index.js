import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  ProfilePage,
  LoadingPage,
  CharSheetPage,
} from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/charSheet" element={<CharSheetPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
