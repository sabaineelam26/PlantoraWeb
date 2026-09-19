import { useState } from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom'; 
import Plantora from './Pages/Plantora'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; 
import Plants from "./Pages/Plants";
import PlantFinder from "./Pages/PlantFinder";
import PlantCare from "./Pages/PlantCare";
import Wishlist from "./Pages/Wishlist";
import Cart from './Pages/Cart'; 
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsService from "./Pages/TermsService";
// import { Profile } from "./Pages/Profile";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Plantora />}></Route>
        <Route path="/plants" element={<Plants />}></Route>
        <Route path="/plantFinder" element={<PlantFinder />}></Route>
        <Route path="/plantCare" element={<PlantCare />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms" element={<TermsService />}></Route>

        {/* <Route path="/profile" element={<Profile />}></Route> */}

        <Route></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
