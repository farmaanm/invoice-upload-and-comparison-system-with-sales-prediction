import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import LoadingScreen from '../../loading/LoadingScreen';


function History() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    /*DB Refrence*/
    const getDataRefContract = collection(db, "Contract");

    const [showData, setShowData] = useState([]);

    useEffect(() => {
        /* Timeout for Loadin Screen */
        setTimeout(() => setLoading(false), 4000) //4s

        /* To retrieve data */
        const q = query(getDataRefContract, orderBy('dateTime', 'asc'));

        const getData = async () => {
            const data = await getDocs(q);
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

            <div style={{position:'fixed', top:'0', width: '100%', backgroundColor:'#F4F4F4'}}>
                <div style={{
                    //position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '30px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                        <a href='/upload'>Upload File</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                        <a href="/history" style={{ textDecoration: 'underline' }} >History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                        <a href="/">Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

            {loading === false ? (
                <div style={{marginTop:'130px'}}>

                    {/* List of Files */}
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

export default History