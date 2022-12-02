import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBValidation,
    MDBValidationItem
}
    from 'mdb-react-ui-kit';


function login() {
    return (
        <MDBContainer fluid>
            <MDBRow>

                <MDBCol sm='6'>

                    <div className='d-flex flex-row ps-5 pt-5'>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                        <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>


                        <select className='mb-4 mx-5 w-100' id='formControlLg' size="1" style={{ padding: '10px', color: '#8c847a' }} required>
                            <option value={0}>User Type</option>
                            <option value={1}>Management Level 1</option>
                            <option value={2}>Management Level 2</option>
                            <option value={3}>Finance</option>
                            <option value={4}>User Level 1</option>
                        </select>

                        <MDBValidation className='row g-3'>

                            <MDBValidationItem /*className='col-md-4'*/ feedback='Please enter Email address.'>
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    label='Email address'
                                    id='formControlLg'
                                    //id='validationCustom01'
                                    type='email'
                                    name='userEmail'
                                    required
                                    size="lg" />
                            </MDBValidationItem>


                            <MDBValidationItem /*className='col-md-4'*/ feedback='Please enter password.'>
                                <MDBInput
                                    wrapperClass='mb-4 mx-5 w-100'
                                    label='Password'
                                    id='formControlLg'
                                    //id='validationCustom02'
                                    type='password'
                                    name='userPassword'
                                    required
                                    size="lg" />
                            </MDBValidationItem>

                            <MDBBtn type='submit' className="mb-4 px-5 mx-5 w-100" color='info' size='lg' style={{ backgroundColor: '#381ce4' }}>Login</MDBBtn>

                        </MDBValidation>
                    </div>

                </MDBCol>

                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                    <img src="https://img.freepik.com/free-photo/aerial-view-cargo-ship-cargo-container-harbor_335224-1380.jpg?w=996&t=st=1663952861~exp=1663953461~hmac=8875f1d42542f15240c371c08595e0f51a8067043342a0b7b937ab29265fc0fa"
                        alt="Login image" className="w-100" height={721} style={{ objectPosition: 'left' }} />
                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default login;