import { MDBBadge } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../loading/LoadingScreen';
import { getHistoryRecords, updateContractStatus, deleteInvoiceRecord } from '../utils/dbOperations/dbOperations'
import NavigationBar from '../utils/navBar/navigationBar'

function Approve() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    const [showData, setShowData] = useState([]);

    /* Loading Screen */
    Approve.setLoadingFalse = () => {
        setLoading(false)
    };

    /* On Load */
    useEffect(() => {

        /* Retrieve History Records */
        getHistoryRecords()
            .then(data => {
                setShowData(data);
                Approve.setLoadingFalse();
            })
            .catch(error => console.log(error));
    });

    /* Updating Status Approved / Rejected */
    const updateStatus = (id, fileStatus) => async () => {
        updateContractStatus(id, fileStatus)
    }

    /* Delete Invoice Record */
    async function deleteRecord(event, id) {
        deleteInvoiceRecord(id)
            .then(message => {
                //setAlertMsg(message)
            })
            .catch(error => console.log(error));
    }


    return (
        <>

            {/* Navigation Bar */}
            <NavigationBar />

            {loading === false ? (
                <div style={{ marginTop: '130px' }}>

                    {/* Approve List of Files */}
                    <div>

                        <div style={{ padding: '10px' }}>

                            <table align='middle' className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Vendor Invoice</th>
                                        <th scope='col'>Payment Requisition</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Uploaded At</th>
                                        <th scope='col'>Uploaded By</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {showData.map(({ id, post }) => {

                                        /* Status Pending */
                                        if (post.status === 'Pending') {

                                            return (

                                                <tr key={id}>
                                                    <td>
                                                        <a href={post.vendorInvoiceUrl}><p className='fw-normal mb-1'>{post.vendorInvoiceName}</p></a>
                                                    </td>
                                                    <td>
                                                        <a href={post.paymentRequisitionUrl}><p className='fw-normal mb-1'>{post.paymentRequisitionName}</p></a>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-success btn-rounded btn-sm" onClick={updateStatus(id, "Approved")} style={{ 'marginRight': '5px' }}>Approve</button>
                                                        <button type="button" className="btn btn-danger btn-rounded btn-sm" onClick={updateStatus(id, "Rejected")}>Reject</button>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{post.dateTime}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{post.uploadedBy}</p>
                                                    </td>
                                                    <td>
                                                        <i className="fas fa-trash-can" onClick={(event) => deleteRecord(event, id)} ></i>
                                                    </td>
                                                </tr>

                                            )

                                            /* Status Approved */
                                        } else {

                                            return (

                                                <tr key={id}>
                                                    <td>
                                                        <a href={post.vendorInvoiceUrl}><p className='fw-normal mb-1'>{post.vendorInvoiceName}</p></a>
                                                    </td>
                                                    <td>
                                                        <a href={post.paymentRequisitionUrl}><p className='fw-normal mb-1'>{post.paymentRequisitionName}</p></a>
                                                    </td>
                                                    <td>
                                                        {/*<span className={"badge rounded-pill badge-" + post.statusMessage}>{post.status}</span>*/}
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
                                                    <td>
                                                        <i className="fas fa-trash-can" onClick={(event) => deleteRecord(event, id)} ></i>
                                                    </td>
                                                </tr>

                                            )

                                        }

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

export default Approve