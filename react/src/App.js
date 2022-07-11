import React from "react";
import logo from './logo.svg';
import './App.css';
import Clock from "./pages/Clock/Clock";
import MagicTable from "./pages/MagicTable/MagicTable";
import CurrencyCalculator from "./pages/CurrencyCalculator/CurrencyCalculator";
import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={42 == 42 ? <Navigate push to="/CurrencyCalculator/EUR/USD" /> : <Clock/>}></Route>
        <Route path='/CurrencyCalculator/:currency1/:currency2' element={<CurrencyCalculator />} />
        <Route path='Table' element={<MagicTable/>} />
      </Routes>
    </Router>
  );
}

export default App;
