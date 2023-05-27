import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Main } from './components/Main';
import Huffman from "./components/Huffman";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
        <Huffman/>
      </div>
    );
  }
}

export default App;
