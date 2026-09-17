import { useState } from "react";
import "./App.css";
import { Routes, Route } from 'react-router-dom'; 
import Plantora from './Pages/Plantora'

function App() {
  const [count, setCount] = useState(0);

  return (
  <>
  <Routes>
    <Route path="/" element={<Plantora/>}></Route>
  </Routes>
  
  </>
  )
}

export default App;
