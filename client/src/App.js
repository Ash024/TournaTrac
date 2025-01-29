import { Route, Routes } from "react-router-dom";
import "./component/Navbar";
import Navbar from "./component/Navbar";
import "./App.css";
import React from "react";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Home from "./component/Home";
import Register from "./component/Register";
import Detail from "./component/Detail";
import PlayerRegister from "./component/PlayerRegister";
import AboutUs from "./component/AboutUs";import Created from "./component/Created";
import PageNotFound from "./component/PageNotFound";
import Tournament from "./component/Tournament";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/playerregister/:id" element={<PlayerRegister />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/tournamentcreated" element={<Created />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;