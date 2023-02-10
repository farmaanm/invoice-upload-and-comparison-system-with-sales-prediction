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

import {userType} from './Nav'

function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    function validateForm() {
        return userEmail.length > 0 && userPassword.length > 0;
    }

    const login = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(() => {
                if (userEmail.includes('@user.com')) {
                    userType('user')
                    navigate('/upload')
                } else if (userEmail.includes('@management.com')) {
                    userType('management')
                    navigate('/approve')
                } else if (userEmail.includes('@head.com')) {
                    userType('head')
                    navigate('/sales')
                } else if (userEmail.includes('@finance.com')) {
                    userType('finance')
                    navigate('/payment')
                }

            })
            .catch(err => setError(err.message))

        if (error) {
            console.log(error)
        }
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

                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                            <form onSubmit={login}>

                                {/*<!-- Email input -->*/}
                                <div class="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="userEmail"
                                        class="form-control form-control-lg"
                                        name='userEmail'
                                        required
                                        value={userEmail}
                                        onChange={e => setUserEmail(e.target.value)}
                                        style={{ border: '1px solid #c4c4c4' }} />
                                    <label class="form-label" for="userEmail">Email</label>
                                </div>

                                {/*<!-- Password input -->*/}
                                <div class="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="userPassword"
                                        class="form-control form-control-lg"
                                        name='userPassword'
                                        required
                                        value={userPassword}
                                        onChange={e => setUserPassword(e.target.value)}
                                        style={{ border: '1px solid #c4c4c4' }} />
                                    <label class="form-label" for="userPassword">Password</label>
                                </div>

                                {/*<!-- Submit button -->*/}
                                <button type="submit" class="btn btn-primary btn-block mb-4 btn-lg" style={{ backgroundColor: '#381ce4' }} disabled={!validateForm()}>Login</button>

                            </form>

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