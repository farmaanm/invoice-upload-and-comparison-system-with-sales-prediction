import { MDBBadge } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../loading/LoadingScreen';
import { getHistoryRecords } from '../utils/dbOperations/dbOperations'
import NavigationBar from '../utils/navBar/navigationBar'

const HeadHistory = () => {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    const [showData, setShowData] = useState([]);

    /* Loading Screen */
    HeadHistory.setLoadingFalse = () => {
        setLoading(false)
    };

    useEffect(() => {

        /* Retrieve History Records */
        getHistoryRecords()
            .then(data => {
                setShowData(data);
                HeadHistory.setLoadingFalse();
            })
            .catch(error => console.log(error));

    });


    return (
        <>
            {/* Navigation Bar */}
            <NavigationBar />

            {loading === false ? (
                <div style={{ marginTop: '130px' }}>

                    {/* List of Files */}
                    <div>

                        <div style={{ padding: '10px' }}>

                            <table align='middle' className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Vendor Invoice</th>
                                        <th scope='col'>Payment Requisition</th>
                                        <th scope='col'>Approval Status</th>
                                        <th scope='col'>Payment Status</th>
                                        <th scope='col'>Payment Done At</th>
                                        <th scope='col'>Uploaded At</th>
                                        <th scope='col'>Uploaded By</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {showData.map(({ id, post }) => {
                                        return (

                                            <tr key={id}>
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
                                                <td>{/*color={post.statusMessage}*/}
                                                    {post.paymentStatus === 'Done' ? (
                                                        <MDBBadge color='success' pill>
                                                            {post.paymentStatus}
                                                        </MDBBadge>
                                                    ) : (<MDBBadge color='warning' pill>
                                                        {post.paymentStatus}
                                                    </MDBBadge>
                                                    )}

                                                </td>
                                                <td>
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
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}

export default HeadHistory