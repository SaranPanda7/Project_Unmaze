import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Qrcodegenerate from "./components/qrcodegenerate";
import Listview from "./components/listview";
import Map from "./components/Map";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/qrcode" element={<Qrcodegenerate />}></Route>
          <Route path="/listview" element={<Listview />}></Route>
          <Route path="/Map" element={<Map />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
