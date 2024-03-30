import "./App.css";
import HomePageComponent from "./components/pages/HomePageComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import SearchPageComponent from "./components/pages/SearchPageComponent";
import SavedLocationsPageComponent from "./components/pages/SavedLocationsPageComponent";

function App() {
 
  console.log(process.env.REACT_APP_API_KEY)

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
