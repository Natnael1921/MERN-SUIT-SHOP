import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Cloths } from "./pages/Cloths";
import { Contact } from "./pages/Contact";
import { AuthPage } from "./pages/AuthPage";
import { PageNav } from "./components/PageNav";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <PageNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cloths" element={<Cloths />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </BrowserRouter>
  );
}
