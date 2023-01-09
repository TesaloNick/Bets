import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import headerLogo from './assets/images/header-logo.png'

function App() {
  return (
    <div className='app'>
      <Router>
        <header className='header'>
          <Link to='/'><img src={headerLogo} alt="header-logo" /></Link>
        </header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game/:id' element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
