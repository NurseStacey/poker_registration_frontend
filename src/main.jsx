import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import './style/widgets.css';
import './style/director-page.css';
import './style/App.css'

import DirectorPage from "./Pages/director-page/director-page.jsx";
import BlankPage from '../src/Pages/blank-page.jsx';
import GameRegistration from '../src/Pages/game-registration.jsx';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<BlankPage />} />
      <Route path="/game-registration" element={<GameRegistration />} />
      <Route path="/director-page" element={<DirectorPage />} />

    </Routes>
  </BrowserRouter>,
);
