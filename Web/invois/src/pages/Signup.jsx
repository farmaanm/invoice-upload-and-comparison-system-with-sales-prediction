import React, { useState } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

import PasswordStrengthBar from 'react-password-strength-bar';
import signupImage from '../images/signupImage.jpeg'
import invoisLogo from '../images/invois_logo.png'
import { addUser } from './utils/dbOperations/dbOperations'

const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    {/* Enable button if fields not empty */ }
    const validateForm = () => {
        return firstName.length > 0 && lastName.length > 0 && role !== "" && email.length > 0 && password.length > 0 && password === repeatPassword;
    }

    {/* Singup function */ }
    const register = e => {
        e.preventDefault()
        setError('')

        // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                addUser(firstName, lastName, role, email)
                {/* Navigate to Login page */ }
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

            <MDBContainer fluid>
                <MDBRow>

                    <MDBCol sm='6'>

                        <div style={{ position: 'absolute', top: '-15px', left: '25px' }}>
                            <img src={invoisLogo}
                                alt="navbar-logo" height={135} />
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
