import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Upload from './user/Upload';
import History from './user/History';
import Approve from './managementlevel2/Approve'
import Contract from './managementlevel2/Contract'
import Login from './Login';
import Signup from './Signup';
import Payment from './finance/Payment'
import Sales from './managementlevel1/Sales'
import HeadHistory from './managementlevel1/HeadHistory'
import HeadContract from './managementlevel1/HeadContract'

import Protected from './utils/Protected';


export default function UserNav() {

    return (
        <Router>
            
            <Routes>

                <Route index element={< Login />}></Route>
                <Route exact path='/signup' element={< Signup />}></Route>

                {/* User Level 1 */}
                <Route exact path='/upload' element={<Protected>< Upload /></Protected>}></Route>
                <Route exact path='/history' element={<Protected>< History /></Protected>}></Route>

                {/* Management Level 2 */}
                <Route exact path='/approve' element={<Protected>< Approve /></Protected>}></Route>
                <Route exact path='/contract' element={<Protected>< Contract /></Protected>}></Route>

                {/* Management Level 1 */}
                <Route exact path='/sales' element={<Protected>< Sales /></Protected>}></Route>
                <Route exact path='/hhistory' element={<Protected>< HeadHistory /></Protected>}></Route>
                <Route exact path='/hcontract' element={<Protected>< HeadContract /></Protected>}></Route>

                {/* Finance */}
                <Route exact path='/payment' element={<Protected>< Payment /></Protected>}></Route>
            </Routes>

        </Router>
    );

}
