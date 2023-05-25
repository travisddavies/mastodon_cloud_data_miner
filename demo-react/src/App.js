//import logo from './logo.svg';
import './App.css';
// import 'path/to/antd.css';

import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FirstView from './components/FirstView';
import SecondView from './components/SecondView';
import ThirdView from './components/ThirdView';

import { Layout } from 'antd';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/homepage">HomePage</Link>
          <Link to="/view1">Scenario1</Link>
          <Link to="/view2">Scenario2</Link>
          <Link to="/view3">Scenario3</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to HomePage</h1>} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/view1" element={<FirstView />} />
          <Route path="/view2" element={<SecondView />} />
          <Route path="/view3" element={<ThirdView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;









