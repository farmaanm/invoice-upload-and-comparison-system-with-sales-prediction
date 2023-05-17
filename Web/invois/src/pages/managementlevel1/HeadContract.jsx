import React, { useEffect, useState } from 'react';
import LoadingScreen from '../../loading/LoadingScreen';
import { getCustomerRecords } from '../utils/dbOperations/dbOperations'
import NavigationBar from '../utils/navBar/navigationBar'

const HeadContract = () => {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    const [showData, setShowData] = useState([]);

    /* Loading Screen */
    HeadContract.setLoadingFalse = () => {
        setLoading(false)
    };

    /* OnLoad */
    useEffect(() => {

        /* Retrieve Customer Records */
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
            <NavigationBar />

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