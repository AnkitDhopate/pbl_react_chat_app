import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "./Login/Login";
import Home from "./Home/Home";
import "./App.css";

const App = () => {
  const user = useSelector((state) => state.user);
  return <> {!user ? <Login /> : <Home />}</>;
};

export default App;
