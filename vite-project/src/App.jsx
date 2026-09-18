import { useState } from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom'; 
import Plantora from './Pages/Plantora'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; 

function App() {
  const [count, setCount] = useState(0);

  return (
  <>
  <Navbar />
  <Routes>
    <Route path="/" element={<Plantora/>}></Route>
    <Route></Route>
  </Routes>
  <Footer/>

  
  </>
  )
}

export default App;
