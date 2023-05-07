import React, { useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon
} from 'mdb-react-ui-kit';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

import PasswordStrengthBar from 'react-password-strength-bar';
import signupImage from '../images/signupImage.jpeg'

import { addUser } from './utils/dbOperations/dbOperations'

import splashLogo from '../images/splash_logo.png'

const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const validateForm = () => {
        return firstName.length > 0 && lastName.length > 0 && role !== "" && email.length > 0 && password.length > 0 && password === repeatPassword;
    }

    const register = e => {
        e.preventDefault()
        setError('')

        // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                addUser(firstName, lastName, role, email)
                navigate('/')
            })
            .catch(err => setError(err.message))

        if (error) {
            console.log(error)
        }

        setFirstName(" ")
        setLastName(" ")
        setRole(" ")
        setEmail(" ")
        setPassword(" ")
        setRepeatPassword(" ")
    }



    return (
        <div>

            {/*
            <section class="vh-100" style={{ backgroundColor: '#eee' }}>
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-lg-12 col-xl-11">
                            <div class="card text-black" style={{ borderRadius: '25px' }}>
                                <div class="card-body p-md-5">
                                    <div class="row justify-content-center">
                                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form class="mx-1 mx-md-4" onSubmit={register} name='registration_form' >

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" class="form-control" onChange={e => setEmail(e.target.value)} />
                                                        <label class="form-label" for="form3Example3c">Email</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" class="form-control" onChange={e => setPassword(e.target.value)} />
                                                        <label class="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex flex-row align-items-center mb-4">
                                                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div class="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" class="form-control" onChange={e => setRepeatPassword(e.target.value)} />
                                                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" class="btn btn-primary btn-lg" disabled={!validateForm()} >Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://images.pexels.com/photos/8777703/pexels-photo-8777703.jpeg"
                                                class="img-fluid" className="w-100" height={600} style={{ objectPosition: 'left' }} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            */}

            <MDBContainer fluid>
                <MDBRow>

                    <MDBCol sm='6'>



                        <div style={{ position: 'absolute', top: '-15px', left: '25px' }}>
                            {/*<MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>*/}
                            <img src={splashLogo}
                                alt="navbar-logo" height={150} />
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4' style={{ margin: 'auto' }}>

                            <br /><br />
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <form onSubmit={register}>

                                {/*<!-- Name -->*/}
                                <div class="row mb-4">
                                    <div class="col">
                                        {/*<!-- First Name -->*/}
                                        <div class="form-outline">
                                            <input type="text" id="form3Example1" class="form-control" onChange={e => setFirstName(e.target.value)} style={{ border: '1px solid #c4c4c4' }} required />
                                            <label class="form-label" for="form3Example1">First name</label>
                                        </div>
                                    </div>
                                    <div class="col">
                                        {/*<!-- Last Name -->*/}
                                        <div class="form-outline">
                                            <input type="text" id="form3Example2" class="form-control" onChange={e => setLastName(e.target.value)} style={{ border: '1px solid #c4c4c4' }} required />
                                            <label class="form-label" for="form3Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                {/*<!-- Role -->*/}
                                <div className="form-outline mb-4">
                                    <select className="form-control" onChange={(e) => setRole(e.target.value)} style={{ border: '1px solid #c4c4c4' }}>
                                        <option className="form-control" value=""></option>
                                        <option className="form-control" value="User Level 1">User Level 1</option>
                                        <option className="form-control" value="Management Level 1">Management Level 1</option>
                                        <option className="form-control" value="Management Level 2">Management Level 2</option>
                                        <option className="form-control" value="Finance">Finance</option>
                                    </select>
                                    <label className="form-label" htmlFor="form3Example3c">Role</label>
                                </div>

                                {/*<!-- Email input -->*/}
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3c" data-testid="email-input" className="form-control" onChange={e => setEmail(e.target.value)} style={{ border: '1px solid #c4c4c4' }} required />
                                    <label className="form-label" htmlFor="form3Example3c">Email</label>
                                </div>

                                {/*<!-- Password input -->*/}
                                <div className="form-outline mb-4">
                                    <input type="password" id="form3Example4c" data-testid="password-input" className="form-control" onChange={e => setPassword(e.target.value)} style={{ border: '1px solid #c4c4c4' }} />
                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                    <PasswordStrengthBar password={password} />
                                </div>

                                {/*<!-- Repeat Password input -->*/}
                                <div className="form-outline mb-4">
                                    <input type="password" id="form3Example4cd" data-testid="repeat-password-input" className="form-control" onChange={e => setRepeatPassword(e.target.value)} style={{ border: '1px solid #c4c4c4' }} />
                                    <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                </div>

                                {/*<!-- Submit button -->*/}
                                <button type="submit" className="btn btn-primary btn-block mb-4 btn-lg" style={{ backgroundColor: '#381ce4' }} disabled={!validateForm()}>Register</button>

                            </form>

                            Already have an account? <a href='/' style={{ textDecoration: 'underline' }}>Sign In</a>

                        </div>

                    </MDBCol>

                    <MDBCol sm='6' className='d-none d-sm-block px-0'>
                        <img src={signupImage}
                            class="img-fluid" alt="Signup-port-cover" className="w-100" height={721} style={{ objectPosition: 'left' }} />

                    </MDBCol>

                </MDBRow>

            </MDBContainer>






        </div>

    )
}

export default Signup
