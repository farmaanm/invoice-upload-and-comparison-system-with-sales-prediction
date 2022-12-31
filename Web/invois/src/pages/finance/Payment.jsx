import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'


function Payment() {

    /*DB Refrence*/
    const getDataRefContract = collection(db, "Contract");
    const qry = query(getDataRefContract, where("status", "==", "Pending"));

    const [showData, setShowData] = useState([]);

    /*To retrieve Pending records */
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(qry);
            setShowData(data.docs.map((doc) => ({ post: doc.data(), id: doc.id })));
        };

        getData();
    });


    return (
        <>
            {/* Navigation Bar */}
            <div>
                <div style={{
                    position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                        <a href='/payment'>Payment</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                        <a href="/">Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

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

                        <tbody>

                            {showData.map(({ id, post }) => {
                                return (

                                    <tr key={id}>
                                        <th scope="row">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value={id} id="flexCheckDefault" />
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
            <div align="right" width="100%" style={{marginRight:'20px'}}>
                <button class="btn btn-primary" type="button" >UPDATE RECORDS</button>
            </div>
        </>
    );
}

export default Payment