import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// eslint-disable-next-line no-unused-vars
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
    {/* header */}
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
