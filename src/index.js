import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Pages
import PlayerLookupPage from "./pages/PlayerLookup";
import Homepage from "./pages/Homepage";
import { TeamBalancingPage } from "./pages/TeamBalancing";
import { RandomPlayerPage } from "./pages/RandomPlayerPick";
import { PlayerMatchmake } from "./pages/MatchMake";
import { Box } from "@mui/material";

// Styles
import "./main.css";
import styles from "./index.module.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Box className={styles.top}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/team-balancing" element={<TeamBalancingPage />} />
        <Route path="/lookup" element={<PlayerLookupPage />} />
        <Route path="/random-player-pick" element={<RandomPlayerPage />} />
        <Route path="/player-matchmake" element={<PlayerMatchmake />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Box>
);
