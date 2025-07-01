import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import "font-awesome/css/font-awesome.min.css";
import StoryDetails from "./pages/StoryDetails";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/story_details/:id" element={<StoryDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
