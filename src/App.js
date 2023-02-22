import './App.css';
import JoySignInSideTemplate from "./pages/login";
import LaundroItems from './pages/laundro_items';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoySignInSideTemplate />} />
        <Route path="/Laundro_Items" element={<LaundroItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
