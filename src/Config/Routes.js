import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Catalog from "../Pages/Catalog";
import Detail from "../Pages/Detail/Detail";

const Routes_config = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
};

export default Routes_config;
