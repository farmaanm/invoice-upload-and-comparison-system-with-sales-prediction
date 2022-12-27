import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';


function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

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

                            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                            <form>

                                {/*<!-- Email input -->*/}
                                <div class="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="userEmail"
                                        class="form-control form-control-lg"
                                        name='userEmail'
                                        required
                                        value={userEmail}
                                        onInput={e => setUserEmail(e.target.value)}
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
                                        onInput={e => setUserPassword(e.target.value)}
                                        style={{ border: '1px solid #c4c4c4' }} />
                                    <label class="form-label" for="userPassword">Password</label>
                                </div>

                                {/*<!-- Submit button -->*/}
                                <button type="submit" class="btn btn-primary btn-block mb-4 btn-lg" style={{ backgroundColor: '#381ce4' }}>Login</button>

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