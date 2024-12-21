import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import OffcanvasNavbar from "./Navbar/OffcanvasNavbar";
import Footer from "./Navbar/Footer";
import Main from "./pages/Main";
import SinglePage from "./pages/SinglePage";
import Event from "./pages/Event";
import CreateEvents from "./pages/CreateEvents";
import ErrorPage from "./Navbar/ErrorPage";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import PasswordReset from "./Auth/PasswordReset";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/single-page/:id" element={<SinglePage />} />
            <Route path="event" element={<Event />} />
            <Route path="/create-events" element={<CreateEvents />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
