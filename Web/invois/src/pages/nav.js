import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import User from './user';
import History from './History';


export default function App() {

    return (
        <Router>
            <div>

                <div style={{
                    position: 'relative',
                    height: '100px'
                }}>

                    <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '250px' }}>
                        <Link to='/'>Upload File</Link>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                        <Link to="/history">History</Link>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                        <a href=''>Log Out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>

                <Routes>
                    <Route index element={< User />}></Route>
                    <Route exact path='/history' element={< History />}></Route>
                </Routes>

            </div>
        </Router>
    );
}
