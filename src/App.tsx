import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './Layout';
import Game from './pages/Game';

import './fonts.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='game' element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
