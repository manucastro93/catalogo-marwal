import { lazy } from "solid-js";
import { Route, Router, Routes } from "solid-app-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        
        <Route path="/dashboard" component={Dashboard} />
      </Routes>
    </Router>
  );
};

export default App;