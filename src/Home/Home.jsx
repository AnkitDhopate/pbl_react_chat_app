import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default Home;
