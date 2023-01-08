import React, { useEffect, useState } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import { collection, doc, getDocs, addDoc, updateDoc, query, orderBy, where } from 'firebase/firestore'
import { db } from '../../firebase'
import LoadingScreen from '../../loading/LoadingScreen';

function Contract() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    /* Setting Rate(USD) Column */
    const [freight, setFreight] = useState(0);
    const [eff, setEff] = useState(0);
    const [other, setOther] = useState(0);

    const handleChangeFreight = event => {
        setFreight(event.target.value);
    };
    const handleChangeEff = event => {
        setEff(event.target.value);
    };
    const handleChangeOther = event => {
        setOther(event.target.value);
    };

    /* Disable Past Dates */
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const todayDate = year + '-' + (month + 1) + '-' + day;


    /*DB Refrence*/
    const getDataRefContract = collection(db, "Customer");

    const [showData, setShowData] = useState([]);

    /* Adding Customer Data */
    const [customerName, setCustomerName] = useState("");
    const [validity, setValidity] = useState("");
    const [destination, setDestination] = useState("");
    const [containerSize, setContainerSize] = useState("");
    const [shippingLine, setShippingLine] = useState("");


    async function addcustomer() {

        const totalValue = parseInt(freight) + parseInt(eff) + parseInt(other);
        const record = [{ containerSize: containerSize, destination: destination, rate: totalValue, shippingLine: shippingLine }];

        const p = query(collection(db, "Customer"), where("customerName", "==", customerName));
        const querySnapshot = await getDocs(p);

        /* Checking if Customer name exists */
        if (!querySnapshot.empty) {
            //console.log("Found")
            const recordAdd = { containerSize: containerSize, destination: destination, rate: totalValue, shippingLine: shippingLine };

            querySnapshot.forEach(async (docFile) => {

                const customerRef = doc(db, "Customer", docFile.id);

                let records_array = docFile.data().records
                //console.log("Records Array: ", records_array)
                //console.log(typeof(records_array))

                /* Appending new record to existing record */
                let newRecord = records_array.push(recordAdd)

                await updateDoc(customerRef, {
                    records: records_array,
                    validity: validity
                });
            });

        } else {
            /* If customer name does not exist, add new record */
            //console.log("Not found")
            try {
                const docRef = await addDoc(getDataRefContract, {
                    customerName: customerName,
                    validity: validity,
                    records: record
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        }

        /* Clearing text boxes after execution */
        setCustomerName("");
        setValidity("");
        setDestination("");
        setContainerSize("");
        setShippingLine("");
        setFreight(0);
        setEff(0);
        setOther(0);

        /*querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });*/
        /************************************************************************** */

    };

    /* OnLoad */
    useEffect(() => {
        /* Timeout for Loading Screen */
        setTimeout(() => setLoading(false), 4000) //4s

        /*To retrieve Customer contract data */

        const q = query(getDataRefContract, orderBy("customerName"));

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
        };

        getData();

    });

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

                    {/* Customer Records */}
                    <div style={{ padding: '2%' }}>

                        {/* Add Customer Toggle Button */}
                        <div>
                            <div align="right" width="100%">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    data-mdb-toggle="collapse"
                                    data-mdb-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    ADD CUSTOMER
                                </button>
                            </div>

                            <div className="collapse mt-3" id="collapseExample">

                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            {/* Customer Name */}
                                            <th scope='col' colSpan={2}>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="text" id="customerName" className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                                                    <label className="form-label" htmlFor="customerName">Customer Name</label>
                                                </div>
                                            </th>

                                            {/* Validity Period */}
                                            <th scope='col'>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="date" id="validity" className="form-control" min={todayDate} value={validity} onChange={(e) => setValidity(e.target.value)} />
                                                    <label className="form-label" htmlFor="validity">Validity Period</label>
                                                </div>
                                            </th>
                                            <th scope='col' colSpan={5}></th>
                                        </tr>

                                        {/* Column Headers */}
                                        <tr>
                                            <th scope='col'>Destination</th>
                                            <th scope='col'>Container Size</th>
                                            <th scope='col'>Freight</th>
                                            <th scope='col'>EFF / BAF</th>
                                            <th scope='col'>Other</th>
                                            <th scope='col'>Rate (USD)</th>
                                            <th scope='col'>Shipping Line</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            {/* Destination */}
                                            <th scope='row'>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <select name="destination" id="destination" className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)}  >
                                                        <option value="">Destination</option>
                                                        <option value="ALGECIRAS">ALGECIRAS</option>
                                                        <option value="BANGKOK">BANGKOK</option>
                                                        <option value="BARCELONA">BARCELONA</option>
                                                        <option value="HAMBURG">HAMBURG</option>
                                                        <option value="HO CHI MINH">HO CHI MINH</option>
                                                        <option value="HONG KONG">HONG KONG</option>
                                                        <option value="INCHON">INCHON</option>
                                                        <option value="JAKARTA">JAKARTA</option>
                                                        <option value="KAOSHIUNG">KAOSHIUNG</option>
                                                        <option value="KARACHI">KARACHI</option>
                                                        <option value="KEELUNG">KEELUNG</option>
                                                        <option value="KOBE">KOBE</option>
                                                        <option value="LAEM CHABANG">LAEM CHABANG</option>
                                                        <option value="LAT KARABANG">LAT KARABANG</option>
                                                        <option value="LONDON">LONDON</option>
                                                        <option value="LOS ANGELES">LOS ANGELES</option>
                                                        <option value="MANILA">MANILA</option>
                                                        <option value="MELBOURNE">MELBOURNE</option>
                                                        <option value="NAGOYA">NAGOYA</option>
                                                        <option value="NEW YORK">NEW YORK</option>
                                                        <option value="OSAKA">OSAKA</option>
                                                        <option value="PENANG">PENANG</option>
                                                        <option value="PORT KLANG">PORT KLANG</option>
                                                        <option value="PUSAN">PUSAN</option>
                                                        <option value="QINGDAO">QINGDAO</option>
                                                        <option value="ROTTERDAM">ROTTERDAM</option>
                                                        <option value="SAN ANTONIO">SAN ANTONIO</option>
                                                        <option value="SHAGHAI">SHAGHAI</option>
                                                        <option value="SHIMIZU">SHIMIZU</option>
                                                        <option value="SINGAPORE">SINGAPORE</option>
                                                        <option value="TOKYO">TOKYO</option>
                                                        <option value="VALENCIA">VALENCIA</option>
                                                        <option value="VALPARAISO">VALPARAISO</option>
                                                        <option value="XIAMEN">XIAMEN</option>
                                                        <option value="YOKOHAMA">YOKOHAMA</option>
                                                    </select>
                                                </div>
                                            </th>

                                            {/* Container Size */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <select name="containerSize" id="containerSize" className="form-control" value={containerSize} onChange={(e) => setContainerSize(e.target.value)}  >
                                                        <option value="">Size</option>
                                                        <option value="20">20</option>
                                                        <option value="40">40</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Freight */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="number" id="freightRate" className="form-control" min={0} onChange={handleChangeFreight} value={freight} />
                                                </div>
                                            </td>

                                            {/* EFF/BAF */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="number" id="effRate" className="form-control" min={0} onChange={handleChangeEff} value={eff} />
                                                </div>
                                            </td>

                                            {/* Other */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="number" id="otherRate" className="form-control" min={0} onChange={handleChangeOther} value={other} />
                                                </div>
                                            </td>

                                            {/* Total */}
                                            <td>{parseInt(freight) + parseInt(eff) + parseInt(other)}</td>

                                            {/* Shipping Line */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <select name="shippingLine" id="shippingLine" className="form-control" value={shippingLine} onChange={(e) => setShippingLine(e.target.value)} >
                                                        <option value="">Line</option>
                                                        <option value="COSCO">COSCO</option>
                                                        <option value="DELMEGE">DELMEGE</option>
                                                        <option value="MCLARENS">MCLARENS</option>
                                                        <option value="ONE">ONE</option>
                                                        <option value="OOCL">OOCL</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                {/* Add Button */}
                                <div align="right" width="100%">
                                    <button className="btn btn-primary" type="button" onClick={addcustomer}>ADD RECORD</button>
                                </div>

                            </div>

                        </div>

                        <br />

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
                                                {post.customerName}
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
                                                            Object.values(post.records).map(( rows, index ) => {
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

export default Contract