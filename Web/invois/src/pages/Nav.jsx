import React, { useState } from 'react'
import { MDBIcon } from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Upload from './user/Upload';
import History from './user/History';
import Approve from './managementlevel2/Approve'
import Contract from './managementlevel2/Contract'
import Login from './Login';
import Signup from './Signup';
import Payment from './finance/Payment'
import Sales from './managementlevel1/Sales'

var userTypeValue = ""

function userType(userVal) {
    console.log(userVal)
    userTypeValue = userVal;
}

export default function UserNav() {

    console.log(userTypeValue)

    const [userType, setuserType] = useState("head")

    //setuserType('user')

    return (
        <Router>
            <div>

                {userType === 'user' ? (
                    <>
                        <div style={{
                            position: 'relative',
                            height: '100px',
                            width: '100%'
                        }}>

                            <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                                <span className="h1 fw-bold mb-0">Invois</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '250px' }}>
                                <Link to='/upload'>Upload File</Link>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                                <Link to="/history">History</Link>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                                <Link to="/">Log out</Link>
                            </div>
                        </div>
                        <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                    </>
                ) : userType === 'management' ? (
                    <>
                        <div style={{
                            position: 'relative',
                            height: '100px',
                            width: '100%'
                        }}>

                            <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                                <span className="h1 fw-bold mb-0">Invois</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '250px' }}>
                                <a href='/approve'>Approve</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                                <a href="/contract">Contract</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                                <a href="/">Log out</a>
                            </div>
                        </div>
                        <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                    </>
                ) : userType === 'head' ? (
                    <>
                        <div style={{
                            position: 'relative',
                            height: '100px',
                            width: '100%'
                        }}>

                            <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                                <span className="h1 fw-bold mb-0">Invois</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '350px' }}>
                                <a href='/history'>History</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '230px' }}>
                                <a href="/contract">Customers</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                                <a href='/sales'>Sales</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                                <a href="/">Log out</a>
                            </div>
                        </div>
                        <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                    </>
                ) : userType === 'finance' ? (
                    <>
                        <div style={{
                            position: 'relative',
                            height: '100px',
                            width: '100%'
                        }}>

                            <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                                <span className="h1 fw-bold mb-0">Invois</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                                <a href='/payment'>Payment</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                                <a href="/">Log out</a>
                            </div>

                        </div>
                        <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                    </>
                ) : (
                    <></>
                )}



            </div>

            <Routes>

                <Route index element={< Login />}></Route>
                <Route exact path='/signup' element={< Signup />}></Route>

                {/* User Level 1 */}
                <Route exact path='/upload' element={< Upload />}></Route>
                <Route exact path='/history' element={< History />}></Route>

                {/* Management Level 2 */}
                <Route exact path='/approve' element={< Approve />}></Route>
                <Route exact path='/contract' element={< Contract />}></Route>

                {/* Management Level 1 */}
                <Route exact path='/sales' element={< Sales />}></Route>

                {/* Finance */}
                <Route exact path='/payment' element={< Payment />}></Route>
            </Routes>


        </Router>
    );
}


export { userType }