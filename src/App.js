import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Routes from "./Config/Routes";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./components/Loader/Loader";
const App = () => {
  const Navigation = useLocation();
  console.log(Navigation);
  const [Loaded, setLoaded] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => setLoaded(false), 3000);
    return () => {
      setLoaded(true);
      clearTimeout(timer);
    };
  }, [Navigation.key]);
  return (
    <React.Fragment>
      <Header />
      {!Loaded ? <Routes /> : <Loader />}
      <Footer />
    </React.Fragment>
  );
};

export default App;
