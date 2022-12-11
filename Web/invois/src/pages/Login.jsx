import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBValidation,
    MDBValidationItem
} from 'mdb-react-ui-kit';


function Login() {

    const getDataRef = collection(db, "User");  //DB reference

    const [showData, setShowData] = useState([]);

    /*To retrieve data */
    useEffect(() => {

        const getData = async () => {
            const data = await getDocs(getDataRef);
            setShowData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getData();
    });

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    /* User Login */
    const [login, setLogin] = useState(false);

    function userLogin() {
        setLogin(true);
    }

    return (

        <div>{showData.map((post) => {

            if ((post.email === userEmail) && (post.password === userPassword) && (login === true)) {
                console.log("Login Success", post.type)
            }
            return 1;

        })}
            <MDBContainer fluid>
                <MDBRow>

                    <MDBCol sm='6'>

                        <div className='d-flex flex-row ps-5 pt-5'>
                            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                            <span className="h1 fw-bold mb-0">Invois</span>
                        </div>

                        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>




                            <MDBValidation className='row g-3'>

                                <MDBValidationItem /*className='col-md-4'*/ /*feedback='Please enter Email address.'*/>
                                    <MDBInput
                                        wrapperClass='mb-4 mx-5 w-100'
                                        label='Email address'
                                        id='formControlLg'
                                        //id='validationCustom01'
                                        type='email'
                                        name='userEmail'
                                        required
                                        size="lg"
                                        value={userEmail}
                                        onInput={e => setUserEmail(e.target.value)} />
                                </MDBValidationItem>


                                <MDBValidationItem /*className='col-md-4'*/ /*feedback='Please enter password.'*/>
                                    <MDBInput
                                        wrapperClass='mb-4 mx-5 w-100'
                                        label='Password'
                                        id='formControlLg'
                                        //id='validationCustom02'
                                        type='password'
                                        name='userPassword'
                                        required
                                        size="lg"
                                        value={userPassword}
                                        onInput={e => setUserPassword(e.target.value)} />
                                </MDBValidationItem>

                                <MDBBtn type='submit'
                                    className="mb-4 px-5 mx-5 w-100"
                                    color='info'
                                    size='lg'
                                    style={{ backgroundColor: '#381ce4' }}
                                    onClick={userLogin}>
                                    Login</MDBBtn>

                            </MDBValidation>


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