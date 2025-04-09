import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/protected/Dashboard";
import AddSet from "./pages/protected/Sets"
import Exercises from "./pages/protected/Exercises"
import Bodyweight from "./pages/protected/Bodyweight";
import Logout from "./pages/protected/Logout" 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/colors.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // This includes Popper.js
import '../scss/components.css';
import '../scss/main.css';




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Sets" element={<AddSet />} />
            <Route path="/Exercises" element={<Exercises />} />
            <Route path="/Bodyweight" element={<Bodyweight />} />
            <Route path="/Logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
