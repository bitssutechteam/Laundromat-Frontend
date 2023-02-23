import './App.css';
import JoySignInSideTemplate from "./pages/login";
import LaundroItems from './pages/laundro_items';
import EmailNav from './pages/test';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Laundromat-Frontend"
          element={<JoySignInSideTemplate />}
        />
        <Route path="/" element={<JoySignInSideTemplate />} />
        <Route path="/Laundro_Items" element={<LaundroItems />} />
        <Route path="/test" element={<EmailNav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
