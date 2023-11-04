import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../common/header/Header"; // Import your Header component here


const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
        <div>
        <Header /> {/* Include the Header component */}
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} baseUrl={baseUrl} />}
        />
      </div>
      </div>
    </Router>
  );
};

export default Controller;
