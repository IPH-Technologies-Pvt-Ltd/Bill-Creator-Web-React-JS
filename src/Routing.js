import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Contact from "./Components/Contact";
// import { Navbar } from "react-bootstrap";
import { Bill1 } from "./Components/Bill1";
import About from "./Components/Accounts";
import Home from "./Components/Home";
const Routing = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-bill" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Bill1" element={<Bill1 />} />
      </Routes>
    </BrowserRouter>
  );
};

Routing.propTypes = {};

export default Routing;
