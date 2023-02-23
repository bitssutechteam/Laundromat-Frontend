import './App.css';
import JoySignInSideTemplate from "./pages/login";
import LaundroItems from './pages/laundro_items';
import EmailNav from './pages/test';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route
          path="/Laundromat-Frontend"
          element={<JoySignInSideTemplate />}
        />
        <Route path="/" element={<JoySignInSideTemplate />} />
        {localStorage.getItem("token") && localStorage.getItem("token")!= 'undefined'&& (
          <Route path="/Laundro_Items" element={<LaundroItems />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
