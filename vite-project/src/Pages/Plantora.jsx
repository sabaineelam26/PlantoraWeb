// import React from 'react'
// import Navbar from '../Components/Navbar';

// const Plantora = () => {

//   return (
//     <div>
//       <Navbar/>

//       <img src="/background.png" style={{width: "100%"}}/>

//       <div>plantora.</div>
//     </div>
//   );
// }

// export default Plantora;

import React from "react";
import "./Plantora.css"; 
import Navbar from "../Components/Navbar";

const Plantora = () => {
  return (
    <div>
      

      <div className="hero">
        <img src="/background.png" className="hero-image" alt="Indoor plants" />

        <div className="hero-content">
          <span className="hero-tag">PLANTS • HOME • HAPPIER YOU</span>

          <h1>
            Bring Nature
            <br />
            Into Your Home
          </h1>

          <p>
            Discover beautiful indoor plants that make your space feel fresh,
            calm, and alive.
          </p>

          <div className="hero-buttons">
            <button>Shop Plants</button>
            <button>Find My Plant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plantora;