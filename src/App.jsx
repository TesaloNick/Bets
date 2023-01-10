import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import headerLogo from './assets/images/header-logo.png'
import BetsData from './context';
import { useState } from 'react';

function App() {
  const [confirmedBet, setConfirmedBet] = useState({
    state: false,
    gameInfo: {},
    bet: {},
  })

  return (
    <div className='app'>
      <Router>
        <BetsData.Provider value={{ confirmedBet, setConfirmedBet }}>
          <header className='header'>
            <Link to='/'><img src={headerLogo} alt="header-logo" /></Link>
          </header>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/game/:id' element={<GamePage />} />
          </Routes>
        </BetsData.Provider>
      </Router>
    </div>
  );
}

export default App;
