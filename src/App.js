// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import TableData from './TableData';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import ScanNew from './ScanNew';
import Login from './login';
import FileList from './FileList';
import ShowData from './ShowData';
function App() {
  return (
    
    <Router>
       <Routes>
      <Route path="/" element={<Login />} />
      </Routes>
      <div className="App">
       
      
        <div className="content">
        
          <Routes>
          <Route path="/table/:tableName"  element={<TableData />}/>
          <Route path="/FileList" element={<FileList />} />
        <Route path="/PA1" element={<ShowData />} />
          <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="Scan" element={<ScanNew />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
