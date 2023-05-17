import { MDBBadge } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../loading/LoadingScreen';
import { getPaymentPending, getPaymentDone, updatePaymentStatus } from '../utils/dbOperations/dbOperations'
import NavigationBar from '../utils/navBar/navigationBar'

const Payment = () => {

    /* Append array of ID user checked boxes */
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
    });

    /* On Change update indexes checked / unchecked */
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

    /* Loading Screen */
    Payment.setLoadingFalse = () => {
        setLoading(false)
    };

    /* On Load */
    useEffect(() => {

        /* Retrieve Payment Pending Invocies */
        getPaymentPending()
            .then(data => {
                setShowData(data);
                //setLoading(false);
                Payment.setLoadingFalse()
            })
            .catch(error => console.log(error));

        /* Retrieve Payment Done Invocies */
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
            <NavigationBar />

            {loading === false ? (<>

                <div style={{ marginTop: '130px' }}>

                    {/* List of Files */}
                    
                    {/* status == Approved, paymentStatus == Pending */}
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

                    {/* status == Approved, paymentStatus == Done */}
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