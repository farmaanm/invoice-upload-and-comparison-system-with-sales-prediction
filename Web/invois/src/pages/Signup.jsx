import React, { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");


    const validateForm = () => {
        return email.length > 0 && password.length > 0 && password === repeatPassword;
    }

    const register = e => {
        e.preventDefault()
        setError('')

        // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
            })
            .catch(err => setError(err.message))

        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }

    const InputFields = {
        padding: '0.5rem',
        margin: '0.8rem',
        borderRadius: '4px'
    }
    const ButtonStyle = {
        borderRadius: '4px',
        padding: '0.7rem',
        margin: '0.5rem'
    }

    return (
        <div>

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

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                class="img-fluid" alt="Sample image" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>







        </div>

    )
}

export default Signup