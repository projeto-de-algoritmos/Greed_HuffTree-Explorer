import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main';
import AboutUs from './components/AboutUs';
import AboutTheProject from './components/AboutTheProject';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Greed_HuffTree-Explorer' element={<Main />} />
        <Route path='/Greed_HuffTree-Explorer/about-us' element={<AboutUs />} />
        <Route path='/Greed_HuffTree-Explorer/about-the-project' element={<AboutTheProject />} />
      </Routes>
    </div>
  );
}
export default App;
