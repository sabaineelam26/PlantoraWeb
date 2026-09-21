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
import ShippingReturn from "./Pages/ShippingReturn";
import Contact from "./Pages/Contact";
import Faqs from "./Pages/Faqs";
import Register from './Components/Register'; 
import Login from './Components/Login'; 
// import Faqs from "./Pages/Faqs"; 
// import { Profile } from "./Pages/Profile";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Plantora />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/plants" element={<Plants />}></Route>
        <Route path="/plantFinder" element={<PlantFinder />}></Route>
        <Route path="/plantCare" element={<PlantCare />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/privacy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms" element={<TermsService />}></Route>
        <Route path="/Faqs" element=<Faqs />></Route>
        <Route path="/shipping" element=<ShippingReturn />></Route>
        <Route path="/contact" element=<Contact />></Route>

        {/* <Route path="/profile" element={<Profile />}></Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
