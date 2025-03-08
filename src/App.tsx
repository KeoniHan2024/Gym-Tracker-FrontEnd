import ListGroup from "./components/ListGroup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home/>} />
          <Route path= "/home" element = {<Home/>} />
          <Route path= "/login" element = {<Home/>} />
          <Route path= "/signup" element = {<Home/>} />

        </Routes>
      </BrowserRouter>
  </div>
}

export default App;