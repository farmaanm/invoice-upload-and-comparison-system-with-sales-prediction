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
import Trial from './trial';

export default function UserNav() {

    //const [isLoggedIn, setisLoggedIn] = useState(false);

    /* Get Current User */
    /*const logIn = () => {
        let username = '';
        let user = auth.currentUser
        if (user) {
            setisLoggedIn(true);
            let useremail = user.email
            console.log('email: ' + useremail)
            //username = useremail.split('@')[0]
        } else {
            //setisLoggedIn(false); 
        }
    }*/

    //logIn()

    /*console.log('x = ' + x)
    var y = x
    console.log('y = ' + y)

    if (x === 'user') {
        console.log('user')
    } else if (x === 'management') {
        console.log('management')
    } else if (x === 'head') {
        console.log('head')
    } else if (x === 'finance') {
        console.log('finance')
    } else {
        console.log('empty')
    }*/

    //const [userType, setuserType] = useState(x)


    //console.log('userType1 = ' + userType)
    //setuserType(x)
    //console.log('userType2 = ' + userType)


    return (
        <Router>
            {/*
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
            */}

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
                <Route exact path='/hhistory' element={< HeadHistory />}></Route>
                <Route exact path='/hcontract' element={< HeadContract />}></Route>

                {/* Finance */}
                <Route exact path='/payment' element={<Protected>< Payment /></Protected>}></Route>
            </Routes>

        </Router>
    );

}

//export { userType }



