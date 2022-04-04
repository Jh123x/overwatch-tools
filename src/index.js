import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';

// Pages
import PlayerLookupPage from './pages/PlayerLookup';
import Homepage from './pages/Homepage';
import { TeamBalancingPage } from './pages/TeamBalancing';
import { RandomPlayerPage } from './pages/RandomPlayerPick';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/team-balancing' element={<TeamBalancingPage />} />
      <Route path='/lookup' element={<PlayerLookupPage />} />
      <Route path='/random-player-pick' element={<RandomPlayerPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
