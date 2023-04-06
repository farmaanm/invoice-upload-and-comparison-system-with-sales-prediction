import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

//import { default as UserNav } from './Nav'

function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    function validateForm() {
        return userEmail.length > 0 && userPassword.length > 0;
    }

    /* Style for Email and Password Error messages */
    const emailerror = {
        color: 'red',
        textAlign: 'left',
    }
    const passworderror = {
        color: 'red',
        textAlign: 'left',
    }

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const login = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(() => {
                if (userEmail.includes('@user.com')) {
                    //userType('user')
                    navigate('/upload')
                    //UserNav('user')
                } else if (userEmail.includes('@management.com')) {
                    //userType('management')
                    navigate('/approve')
                    //UserNav('management')
                } else if (userEmail.includes('@head.com')) {
                    //userType('head')
                    navigate('/sales')
                    //UserNav('head')
                } else if (userEmail.includes('@finance.com')) {
                    //userType('finance')
                    navigate('/payment')
                    //UserNav('finance')
                }

            })
            .catch(err => {
                setError(err.message)
                if (err.message === 'Firebase: Error (auth/user-not-found).') {
                    console.log(err.message)
                    setEmailErrorMsg('User email not found')
                    setPasswordErrorMsg('')

                } else if (err.message === 'Firebase: Error (auth/wrong-password).') {
                    console.log(err.message)
                    setEmailErrorMsg('')
                    setPasswordErrorMsg('Invalid password')
                }
            })

    }

    

    return (

        <div>

            <MDBContainer fluid>
                <MDBRow>

                    <MDBCol sm='6'>

                        <div className='d-flex flex-row ps-5 pt-5'>
                            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4' style={{ margin: 'auto' }}>

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                            <form onSubmit={login}>

                                {/*<!-- Email input -->*/}
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="userEmail"
                                        className="form-control form-control-lg"
                                        name='userEmail'
                                        required
                                        value={userEmail}
                                        data-testid="email-input"
                                        onChange={e => setUserEmail(e.target.value)}
                                        style={{ border: '1px solid #c4c4c4' }} />
                                    <label className="form-label" htmlFor="userEmail">Email</label>
                                    <p style={emailerror} id="email-error">{emailErrorMsg}</p>
                                </div>


                                {/*<!-- Password input -->*/}
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="userPassword"
                                        className="form-control form-control-lg"
                                        name='userPassword'
                                        required
                                        value={userPassword}
                                        data-testid="password-input"
                                        onChange={e => setUserPassword(e.target.value)}
                                        style={{ border: '1px solid #c4c4c4' }} />
                                    <label className="form-label" htmlFor="userPassword" >Password</label>
                                    <p style={passworderror} id="password-error">{passwordErrorMsg}</p>
                                </div>


                                {/*<!-- Submit button -->*/}
                                <button type="submit" className="btn btn-primary btn-block mb-4 btn-lg" style={{ backgroundColor: '#381ce4' }} disabled={!validateForm()}>Login</button>

                            </form>

                            Don't have an account? <a href='/signup' style={{ textDecoration: 'underline' }}>Sign Up</a>

                        </div>

                    </MDBCol>

                    <MDBCol sm='6' className='d-none d-sm-block px-0'>
                        <img src="https://img.freepik.com/free-photo/aerial-view-cargo-ship-cargo-container-harbor_335224-1380.jpg?w=996&t=st=1663952861~exp=1663953461~hmac=8875f1d42542f15240c371c08595e0f51a8067043342a0b7b937ab29265fc0fa"
                            alt="Login-port-cover" className="w-100" height={721} style={{ objectPosition: 'left' }} />
                    </MDBCol>

                </MDBRow>

            </MDBContainer>

        </div>
    );
}

export default Login;