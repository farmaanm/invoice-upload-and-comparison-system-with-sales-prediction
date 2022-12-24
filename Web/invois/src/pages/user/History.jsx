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
    );
}

export default History