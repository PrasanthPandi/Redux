import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./landingpage/container/mainLayout";

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
