import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import HomePageComponent from "./components/pages/HomePageComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import SearchPageComponent from "./components/pages/SearchPageComponent";
import { setDarkModeActivation } from "nes-ui-react";
import SavedLocationsPageComponent from "./components/pages/SavedLocationsPageComponent";

function App() {
 
 

  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />} />
          <Route path="/search" element={<SearchPageComponent />} />
          <Route path="/saved" element={<SavedLocationsPageComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
