import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import LoadingScreen from '../../loading/LoadingScreen';


function HeadHistory() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    /*DB Refrence*/
    const getDataRefContract = collection(db, "Contract");

    const [showData, setShowData] = useState([]);

    useEffect(() => {
        /* Timeout for Loadin Screen */
        setTimeout(() => setLoading(false), 3000) //3s

        /* To retrieve data */
        const getData = async () => {
            const data = await getDocs(getDataRefContract);
            setShowData(data.docs.map((doc) => ({ post: doc.data(), id: doc.id })));
        };

        getData();
    });

    /*useEffect(() => {
        db.collection("Contract").onSnapshot((snapshot) => {
            setShowData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
        console.log({ showData });
      }, []);*/


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

                    <div style={{ position: 'absolute', bottom: '10px', right: '350px' }}>
                        <a href='/hhistory' style={{ textDecoration: 'underline' }}>History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '230px' }}>
                        <a href="/hcontract">Customers</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                        <a href='/sales'>Sales</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                        <a href="/">Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

            {loading === false ? (
                <div>

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