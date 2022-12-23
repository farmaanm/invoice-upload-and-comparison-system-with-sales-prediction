import { MDBBadge } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'


function History() {

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

                {showData.map((post) => {
                    return <div>
                        <table align='middle' className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>Vendor Invoice</th>
                                    <th scope='col'>Payment Requisition</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Uploaded At</th>
                                    <th scope='col'>Uploaded By</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
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
                            </tbody>
                        </table>
                    </div>
                })}




            </div>

        </div>
    );
}

export default History