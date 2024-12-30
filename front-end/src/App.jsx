import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./pages/Main";
import SinglePage from "./pages/SinglePage";
import Event from "./pages/Event";
import CreateEvents from "./pages/CreateEvents";
import ErrorPage from "./Navbar/ErrorPage";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgotPassword from "./Auth/ForgotPassword";
import PasswordReset from "./Auth/PasswordReset";
import SendMessage from "./Navbar/SendMessage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/single-page/:_id" element={<SinglePage />} />
            <Route path="event" element={<Event />} />
            <Route path="/create-events" element={<CreateEvents />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<PasswordReset />}
          />
          <Route path="/Send-DM" element={<SendMessage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
