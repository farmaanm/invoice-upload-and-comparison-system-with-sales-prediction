import React from 'react'
//import { MDBIcon } from 'mdb-react-ui-kit';
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

//import logo from '../../../images/logo.png'
import splashLogo from '../../../images/splash_logo.png'
import invoisLogo from '../../../images/invois_logo.png'

const NavigationBar = () => {

    const currentPath = window.location.pathname;
    //console.log(currentPath);

    const authToken = localStorage.getItem('authToken');

    //style={{ textDecoration: 'underline' }}

    if (authToken.includes('@user')) {

        return (
            <>
                <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4' }}>
                    <div style={{
                        //position: 'relative',
                        height: '100px',
                        width: '100%'
                    }}>

                        <div style={{ position: 'absolute', top: '-5px', left: '25px' }}>
                            {/*<MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>*/}
                            <img src={invoisLogo}
                                alt="navbar-logo" height={120} />
                        </div>
                        {currentPath === '/upload' ? (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                                    <a href='/upload' style={{ textDecoration: 'underline' }} >Upload File</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                                    <a href="/history">History</a>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                                    <a href='/upload' >Upload File</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                                    <a href="/history" style={{ textDecoration: 'underline' }}>History</a>
                                </div>
                            </>
                        )}

                        <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                            <a href="/" onClick={() => { signOut(auth); localStorage.removeItem('authToken'); }}>Log out</a>
                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                </div>
            </>
        )
    } else if (authToken.includes('@management')) {

        return (
            <>
                <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4' }}>
                    <div style={{
                        //position: 'relative',
                        height: '100px',
                        width: '100%'
                    }}>

                        <div style={{ position: 'absolute', top: '-5px', left: '25px' }}>
                            {/*<MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>*/}
                            <img src={invoisLogo}
                                alt="navbar-logo" height={120} />
                        </div>
                        {currentPath === '/approve' ? (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '250px' }}>
                                    <a href='/approve' style={{ textDecoration: 'underline' }}>Approve</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                                    <a href="/contract">Contract</a>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '250px' }}>
                                    <a href='/approve' >Approve</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                                    <a href="/contract" style={{ textDecoration: 'underline' }}>Contract</a>
                                </div>
                            </>
                        )}

                        <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                            <a href="/" onClick={() => { signOut(auth); localStorage.removeItem('authToken'); }}>Log out</a>
                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                </div>
            </>
        )
    } else if (authToken.includes('@head')) {

        return (
            <>
                <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4' }}>
                    <div style={{
                        //position: 'relative',
                        height: '100px',
                        width: '100%'
                    }}>

                        <div style={{ position: 'absolute', top: '-5px', left: '25px' }}>
                            {/*<MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>*/}
                            <img src={invoisLogo}
                                alt="navbar-logo" height={120} />
                        </div>
                        {currentPath === '/sales' ? (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '320px' }}>
                                    <a href='/sales' style={{ textDecoration: 'underline' }}>Sales</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                                    <a href='/hhistory'>History</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '140px' }}>
                                    <a href="/hcontract" >Customers</a>
                                </div>
                            </>
                        ) : currentPath === '/hhistory' ? (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '320px' }}>
                                    <a href='/sales' >Sales</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                                    <a href='/hhistory' style={{ textDecoration: 'underline' }}>History</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '140px' }}>
                                    <a href="/hcontract" >Customers</a>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ position: 'absolute', bottom: '45px', right: '320px' }}>
                                    <a href='/sales' >Sales</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                                    <a href='/hhistory' >History</a>
                                </div>

                                <div style={{ position: 'absolute', bottom: '45px', right: '140px' }}>
                                    <a href="/hcontract" style={{ textDecoration: 'underline' }}>Customers</a>
                                </div>
                            </>
                        )}

                        <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                            <a href="/" onClick={() => { signOut(auth); localStorage.removeItem('authToken'); }}>Log out</a>
                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                </div>
            </>
        )
    } else if (authToken.includes('@finance')) {

        return (
            <>
                <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4' }}>
                    <div style={{
                        //position: 'relative',
                        height: '100px',
                        width: '100%'
                    }}>

                        <div style={{ position: 'absolute', top: '-5px', left: '25px' }}>
                            {/*<MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>*/}
                            <img src={invoisLogo}
                                alt="navbar-logo" height={120} />
                        </div>

                        <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                            <a href='/payment' style={{ textDecoration: 'underline' }}>Payment</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                            <a href="/" onClick={() => { signOut(auth); localStorage.removeItem('authToken'); }}>Log out</a>
                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                </div>
            </>
        )
    }
}

export default NavigationBar
