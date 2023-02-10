import './App.css';
import Approve from './pages/managementlevel2/Approve'
import Contract from './pages/managementlevel2/Contract'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upload from './pages/user/Upload'
import History from './pages/user/History'
import Payment from './pages/finance/Payment'
import Sales from './pages/managementlevel1/Sales'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Nav from './pages/Nav'

function App() {

    return (
        <>
            <div className="App">

                <Nav/>

            </div>
        </>
    );
}

export default App;
