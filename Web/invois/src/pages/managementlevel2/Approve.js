import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'


function Approve() {

    /*DB Refrence*/
    const getDataRefContract = collection(db, "Contract");

    const [showData, setShowData] = useState([]);

    /*To retrieve data */
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(getDataRefContract);
            setShowData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getData();
    });


    return (
        <div>

            <div style={{ padding: '10px' }}>

                <MDBTable align='middle'>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Vendor Invoice</th>
                            <th scope='col'>Payment Requisition</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Uploaded At</th>
                            <th scope='col'>Uploaded By</th>
                        </tr>
                    </MDBTableHead>

                    <MDBTableBody>

                        <tr>
                            <td>
                                {showData.map((post) => {
                                    return <div>
                                        <a href={post.vendorInvoiceUrl}><p className='fw-normal mb-1'>{post.vendorInvoiceName}</p></a>
                                        <hr />
                                    </div>
                                })}

                            </td>
                            <td>
                                {showData.map((post) => {
                                    return <div>
                                        <a href={post.paymentRequisitionUrl}><p className='fw-normal mb-1'>{post.paymentRequisitionName}</p></a>
                                        <hr />
                                    </div>
                                })}
                            </td>
                            <td>
                                {showData.map((post) => {
                                    if (post.status === 'Pending') {
                                        return <div>
                                            <MDBBadge pill color='success' light id='approve'>
                                                Approve
                                            </MDBBadge>
                                            <MDBBadge pill className='mx-2' color='danger' light id='reject'>
                                                Reject
                                            </MDBBadge>
                                            <hr />
                                        </div>
                                    }
                                    else {
                                        return <div>
                                            <MDBBadge color={post.statusMessage} pill>
                                                {post.status}
                                            </MDBBadge>
                                            <hr />
                                        </div>
                                    }

                                })}
                            </td>
                            <td>
                                {showData.map((post) => {
                                    return <div>
                                        <p className='fw-normal mb-1'>{post.dateTime}</p>
                                        <hr />
                                    </div>
                                })}
                            </td>
                            <td>
                                {showData.map((post) => {
                                    return <div>
                                        <p className='fw-normal mb-1'>{post.uploadedBy}</p>
                                        <hr />
                                    </div>
                                })}
                            </td>
                        </tr>
                    </MDBTableBody>

                </MDBTable>

            </div>

        </div>
    );
}

export default Approve