import React, { useEffect, useState } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import LoadingScreen from '../../loading/LoadingScreen';
import { signOut } from 'firebase/auth';

import { getCustomerRecords } from '../utils/dbOperations/dbOperations'
import NavigationBar from '../utils/navBar/navigationBar'

function HeadContract() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    /*DB Refrence*/
    //const getDataRefContract = collection(db, "Customer");

    const [showData, setShowData] = useState([]);
    
    HeadContract.setLoadingFalse = () => {
        setLoading(false)
    };

    /* OnLoad */
    useEffect(() => {
        /* Timeout for Loading Screen */
        //setTimeout(() => setLoading(false), 3000) //3s

        /*To retrieve Customer contract data */

        /*const q = query(getDataRefContract, orderBy("customerName"));

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
        };

        getData();*/

        //const data = headCustomerRecords;
        //setShowData(headCustomerRecords)

        getCustomerRecords()
            .then(data => {
                setShowData(data)
                HeadContract.setLoadingFalse()
            })
            .catch(error => console.log(error));

    }, []);

    return (
        <>

            {/* Navigation Bar */}
            <NavigationBar/>
            {/*<div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4' }}>
                <div style={{
                    //position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '30px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '320px' }}>
                        <a href='/sales' >Sales</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                        <a href='/hhistory'>History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '140px' }}>
                        <a href="/hcontract" style={{ textDecoration: 'underline' }}>Customers</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                        <a href="/" onClick={() => { signOut(auth); localStorage.removeItem('authToken'); }}>Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>*/}

            {loading === false ? (

                <div style={{ marginTop: '130px' }}>

                    {/* Customer Records */}
                    <div style={{ padding: '2%' }}>

                        {/* Customer Records */}
                        <div className="accordion" id="accordionExample">

                            {showData.map(({ id, post }) => {
                                const destination = [];
                                const containerSize = [];
                                const rate = [];
                                const shippingLine = [];

                                //console.log(typeof(post.records))

                                for (var i = 0; i < post.records.length; i++) {
                                    destination.push(post.records[i].destination)
                                    containerSize.push(post.records[i].containerSize)
                                    rate.push(post.records[i].rate)
                                    shippingLine.push(post.records[i].shippingLine)
                                }


                                return (
                                    <div className="accordion-item" key={id}>
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target={"#" + id}
                                                aria-expanded="false"
                                                aria-controls="collapseOne"
                                            >
                                                {post.customerName} | {post.validity}
                                            </button>
                                        </h2>
                                        <div id={id} className="accordion-collapse collapse" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <table className='table table-striped table-hover'>
                                                    <thead>
                                                        <tr>
                                                            <th scope='col'>Destination</th>
                                                            <th scope='col'>Container Size</th>
                                                            <th scope='col'>Rate (USD)</th>
                                                            <th scope='col'>Shipping Line</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            Object.values(post.records).map((rows, index) => {
                                                                return (
                                                                    <tr key={rows.destination}>
                                                                        <th scope='row'>{rows.destination}</th>
                                                                        <td>{rows.containerSize}</td>
                                                                        <td>{rows.rate}</td>
                                                                        <td>{rows.shippingLine}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}



                        </div>

                    </div>
                </div>

            ) : (
                <LoadingScreen />
            )}
        </>
    );
}

export default HeadContract