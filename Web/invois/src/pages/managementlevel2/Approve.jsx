import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import LoadingScreen from '../../loading/LoadingScreen';
//import { async } from '@firebase/util';


function Approve() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    /*DB Refrence*/
    const getDataRefContract = collection(db, "Contract");

    const [showData, setShowData] = useState([]);

    /* On Load */
    useEffect(() => {
        /* Timeout for Loadin Screen */
        setTimeout(() => setLoading(false), 4000) //4s

        /*To retrieve data */
        const getData = async () => {
            const data = await getDocs(getDataRefContract);
            setShowData(data.docs.map((doc) => ({ post: doc.data(), id: doc.id })));
        };

        getData();
    });

    /* Updating Status Approved / Rejected */
    const updateStatus = (id, fileStatus) => async () => {
        //alert('Working ' + id)

        const contractRef = doc(db, "Contract", id);
        const docSnap = await getDoc(contractRef);

        /* If status == Approved */
        if (fileStatus === "Approved") {
            if (docSnap.exists()) {
                //console.log("Document data:", docSnap.data());
                await updateDoc(contractRef, {
                    status: "Approved",
                    statusMessage: "success"
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } else {
        /* If status == Rejected */
            if (docSnap.exists()) {
                //console.log("Rejected", docSnap.data());
                await updateDoc(contractRef, {
                    status: "Rejected",
                    statusMessage: "danger"
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        /*
            status: "Rejected",
            statusMessage: "danger"

            status: "Approved",
            statusMessage: "success"

            status: "Pending",
            statusMessage: "warning"
        */

    }


    return (
        <>
            {loading === false ? (
                <div>
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

                            <div style={{ position: 'absolute', bottom: '10px', right: '250px' }}>
                                <a href='/approve'>Approve</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                                <a href="/contract">Contract</a>
                            </div>

                            <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                                <a href="/">Log out</a>
                            </div>
                        </div>
                        <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
                    </div>
                    
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
                                                        <button type="button" class="btn btn-success btn-rounded btn-sm" onClick={updateStatus(id, "Approved")}>Approve</button>
                                                        <button type="button" class="btn btn-danger btn-rounded btn-sm" onClick={updateStatus(id, "Rejected")}>Reject</button>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{post.dateTime}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{post.uploadedBy}</p>
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
                                                        <span className={"badge rounded-pill badge-" + post.statusMessage}>{post.status}</span>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{post.dateTime}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{post.uploadedBy}</p>
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