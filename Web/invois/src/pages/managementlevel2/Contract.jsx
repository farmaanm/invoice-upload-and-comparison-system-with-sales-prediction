import React, { useEffect, useState } from 'react';
import { getCustomerRecords, addUpdateCustomer, deleteCustomerArray, deleteCustomerRecord } from '../utils/dbOperations/dbOperations'
import LoadingScreen from '../../loading/LoadingScreen';
import NavigationBar from '../utils/navBar/navigationBar'

const Contract = () => {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    /* Setting Rate(USD) Column */
    const [freight, setFreight] = useState(0);
    const [eff, setEff] = useState(0);
    const [other, setOther] = useState(0);

    const [alertMsg, setAlertMsg] = useState('');
    /* Alert message CSS style */
    const alertMsgStyle = {
        color: '#546ca2',
        textAlign: 'left',
        paddingLeft: '2%'
    }

    /* On Change set value */
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

    const [showData, setShowData] = useState([]);

    /* Adding Customer Data */
    const [customerName, setCustomerName] = useState("");
    const [validity, setValidity] = useState("");
    const [destination, setDestination] = useState("");
    const [containerSize, setContainerSize] = useState("");
    const [shippingLine, setShippingLine] = useState("");

    /* Validating form to enable add button */
    function validateForm() {
        return customerName.length > 0 && validity.length > 0 && destination.length > 0 && containerSize.length > 0 && shippingLine.length > 0;
    }

    /* Add customer function */
    async function addcustomer() {
        
        const totalValue = parseInt(freight) + parseInt(eff) + parseInt(other);
        const record = [{ containerSize: containerSize, destination: destination, rate: totalValue, shippingLine: shippingLine }];

        addUpdateCustomer(customerName, validity, record)
            .then(message => {
                setAlertMsg(message)
            })
            .catch(error => console.log(error));

        /* Clearing text boxes after execution */
        setCustomerName("");
        setValidity("");
        setDestination("");
        setContainerSize("");
        setShippingLine("");
        setFreight(0);
        setEff(0);
        setOther(0);

    };

    /* Delete customer sub record function */
    async function deleteRecord(event, id, index) {

        deleteCustomerArray(id, index)
            .then(message => {
                setAlertMsg(message)
            })
            .catch(error => console.log(error));
    }

    /* Delete customer record function */
    async function deleteCustomer(event, id) {

        deleteCustomerRecord(id)
            .then(message => {
                setAlertMsg(message)
            })
            .catch(error => console.log(error));
    }

    /* Loading Screen */
    Contract.setLoadingFalse = () => {
        setLoading(false)
    };

    /* OnLoad */
    useEffect(() => {
        
        /* Retrieve Customer Records */
        getCustomerRecords()
            .then(data => {
                setShowData(data)
                Contract.setLoadingFalse()
            })
            .catch(error => console.log(error));

    }, []);


    return (
        <>

            {/* Navigation Bar */}
            <NavigationBar/>

            {loading === false ? (

                <div style={{ marginTop: '130px' }}>

                    <p style={alertMsgStyle}>{alertMsg}</p>

                    {/* Customer Records */}
                    <div style={{ padding: '1% 2% 2% 2%' }}>

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
                                    style={{ backgroundColor: '#381ce4' }}
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
                                                    <input type="text" id="customerName" data-testid="cusName-text-box" className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                                                    <label className="form-label" htmlFor="customerName">Customer Name</label>
                                                </div>
                                            </th>

                                            {/* Validity Period */}
                                            <th scope='col'>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="date" id="validity" data-testid="validity-text-box" className="form-control" min={todayDate} value={validity} onChange={(e) => setValidity(e.target.value)} />
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
                                                    <select name="destination" data-testid="destination-input" id="destination" className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)}  >
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
                                                    <select name="containerSize" id="containerSize" data-testid="container-input" className="form-control" value={containerSize} onChange={(e) => setContainerSize(e.target.value)}  >
                                                        <option value="">Size</option>
                                                        <option value="20">20</option>
                                                        <option value="40">40</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Freight */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="number" id="freightRate" data-testid="freight-input" className="form-control" min={0} onChange={handleChangeFreight} value={freight} />
                                                </div>
                                            </td>

                                            {/* EFF/BAF */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="number" id="effRate" data-testid="eff-input" className="form-control" min={0} onChange={handleChangeEff} value={eff} />
                                                </div>
                                            </td>

                                            {/* Other */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <input type="number" id="otherRate" data-testid="other-input" className="form-control" min={0} onChange={handleChangeOther} value={other} />
                                                </div>
                                            </td>

                                            {/* Total */}
                                            <td>{parseInt(freight) + parseInt(eff) + parseInt(other)}</td>

                                            {/* Shipping Line */}
                                            <td>
                                                <div className="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                                    <select name="shippingLine" id="shippingLine" data-testid="shippingLine-input" className="form-control" value={shippingLine} onChange={(e) => setShippingLine(e.target.value)} >
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
                                    <button className="btn btn-primary" style={{ backgroundColor: '#381ce4' }} type="button" onClick={addcustomer} disabled={!validateForm()}>ADD RECORD</button>
                                </div>

                            </div>

                        </div>

                        <br />

                        {/* Customer Records */}
                        <div className="accordion" id="accordionExample" style={{ zIndex: '0' }}>

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
                                                {post.customerName} | {post.validity} |<span style={{ marginLeft: '1150px' }}> <i className="fas fa-trash-can" onClick={(event) => deleteCustomer(event, id)}></i> </span>
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
                                                            <th scope='col'>Action</th>
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
                                                                        <td><i className="fas fa-trash-can" onClick={(event) => deleteRecord(event, id, index)} ></i></td>
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