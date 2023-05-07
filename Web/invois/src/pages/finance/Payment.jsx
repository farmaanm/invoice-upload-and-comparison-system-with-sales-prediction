import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where, doc, getDoc, updateDoc, orderBy } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import LoadingScreen from '../../loading/LoadingScreen';
import { signOut } from 'firebase/auth'

import { getPaymentPending, getPaymentDone, updatePaymentStatus } from '../utils/dbOperations/dbOperations'
import NavigationBar from '../utils/navBar/navigationBar'

function Payment() {

    /* Append array of ID user checked boxes */
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
    });

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;

        console.log(`${value} is ${checked}`);

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                languages: [...languages, value],
                response: [...languages, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                languages: languages.filter((e) => e !== value),
                response: languages.filter((e) => e !== value),
            });
        }

        //console.log(typeof (userinfo.response))
        //console.log(userinfo.response)
    };

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    const [showData, setShowData] = useState([]);
    const [showDoneData, setShowDoneData] = useState([]);

    Payment.setLoadingFalse = () => {
        setLoading(false)
    };

    /* On Load */
    useEffect(() => {
        
        getPaymentPending()
            .then(data => {
                setShowData(data);
                //setLoading(false);
                Payment.setLoadingFalse()
            })
            .catch(error => console.log(error));

        getPaymentDone()
            .then(data => {
                setShowDoneData(data);
                //setLoading(false);
            })
            .catch(error => console.log(error));


    });
    
    /* Updating Payment Status Pending / Done */
    const paymentUpdateStatus = () => async () => {

        updatePaymentStatus(userinfo)
        
        /*
            paymentStatus: "Pending",
            paymentStatus: "Done",
        */
    }


    return (
        <>
            {/* Navigation Bar */}
            <NavigationBar/>
            {/*<div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4' }}>
                <div style={{
                    //position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '30px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                        <a href='/payment' style={{ textDecoration: 'underline' }}>Payment</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                        <a href="/" onClick={() => { signOut(auth); localStorage.removeItem('authToken'); }}>Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>*/}

            {loading === false ? (<>
                
                <div style={{ marginTop: '130px' }}>

                    {/* List of Files */}
                    <div>
                        <div style={{ padding: '10px' }}>
                            <table align='middle' className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'></th>
                                        <th scope='col'>Vendor Invoice</th>
                                        <th scope='col'>Payment Requisition</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Uploaded At</th>
                                        <th scope='col'>Uploaded By</th>
                                    </tr>
                                </thead>

                                {/* status == Approved, paymentStatus == Pending */}
                                <tbody>

                                    {showData.map(({ id, post }) => {

                                        return (

                                            <tr key={id}>
                                                <th scope="row">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value={id} id="flexCheckDefault" onChange={handleChange} />
                                                    </div>
                                                </th>
                                                <td>
                                                    <a href={post.vendorInvoiceUrl}><p className='fw-normal mb-1'>{post.vendorInvoiceName}</p></a>
                                                </td>
                                                <td>
                                                    <a href={post.paymentRequisitionUrl}><p className='fw-normal mb-1'>{post.paymentRequisitionName}</p></a>
                                                </td>
                                                <td>
                                                    <MDBBadge color={post.statusMessage} pill>
                                                        {post.status}
                                                    </MDBBadge>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{post.dateTime}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{post.uploadedBy}</p>
                                                </td>
                                            </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add Button */}
                    <div align="right" width="100%" style={{ marginRight: '20px' }}>
                        <button className="btn btn-primary" style={{ backgroundColor: '#381ce4' }} type="button" onClick={paymentUpdateStatus()} >UPDATE RECORDS</button>
                    </div>

                    <hr />
                    <p className="text-uppercase fs-5 text-start" style={{ paddingLeft: '10px' }}>Payment Completed</p>

                    <div>
                        <div style={{ padding: '10px' }}>
                            <table align='middle' className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'></th>
                                        <th scope='col'>Vendor Invoice</th>
                                        <th scope='col'>Payment Requisition</th>
                                        <th scope='col'>Payment Done At</th>
                                        <th scope='col'>Uploaded At</th>
                                        <th scope='col'>Uploaded By</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {/* status == Approved, paymentStatus == Done */}
                                    {showDoneData.map(({ id, post }) => {

                                        return (

                                            <tr key={id}>
                                                <th scope="row">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value={id} id="flexCheckDefault" checked />
                                                    </div>
                                                </th>
                                                <td>
                                                    <a href={post.vendorInvoiceUrl}><p className='fw-normal mb-1'>{post.vendorInvoiceName}</p></a>
                                                </td>
                                                <td>
                                                    <a href={post.paymentRequisitionUrl}><p className='fw-normal mb-1'>{post.paymentRequisitionName}</p></a>
                                                </td>
                                                <td>
                                                    {/*<MDBBadge color={post.statusMessage} pill>
                                                        {post.status}
                                                    </MDBBadge>*/}
                                                    <p className='fw-normal mb-1'>{post.paymentDoneAt}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{post.dateTime}</p>
                                                </td>
                                                <td>
                                                    <p className='fw-normal mb-1'>{post.uploadedBy}</p>
                                                </td>
                                            </tr>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </>) : (
                <LoadingScreen />
            )}
        </>
    );
}

export default Payment