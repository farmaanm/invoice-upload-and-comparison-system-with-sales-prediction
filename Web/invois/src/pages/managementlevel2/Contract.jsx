import React, { useState } from 'react';

function Contract() {

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



    return (
        <div style={{ padding: '2%' }}>

            Add Contract Page <br />

            {/* Add Customer Toggle Button */}

            <div>
                <div align="right" width="100%">
                    <button
                        class="btn btn-primary"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                    >
                        ADD CUSTOMER
                    </button>
                </div>

                <div class="collapse mt-3" id="collapseExample">

                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th scope='col' colSpan={2}>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <input type="text" id="customerName" class="form-control" />
                                        <label class="form-label" for="customerName">Customer Name</label>
                                    </div>
                                </th>
                                <th scope='col'>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <input type="date" id="validity" class="form-control" min={todayDate} />
                                        <label class="form-label" for="validity">Validity Period</label>
                                    </div>
                                </th>
                                <th scope='col' colSpan={5}></th>
                            </tr>
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
                                <th scope='row'>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <select name="destination" id="destination" class="form-control" >
                                            <option value="0">ALGECIRAS</option>
                                            <option value="1">BANGKOK</option>
                                            <option value="2">BARCELONA</option>
                                            <option value="3">HAMBURG</option>
                                            <option value="4">HO CHI MINH</option>
                                            <option value="5">HONG KONG</option>
                                            <option value="6">INCHON</option>
                                            <option value="7">JAKARTA</option>
                                            <option value="8">KAOSHIUNG</option>
                                            <option value="9">KARACHI</option>
                                            <option value="10">KEELUNG</option>
                                            <option value="11">KOBE</option>
                                            <option value="12">LAEM CHABANG</option>
                                            <option value="13">LAT KARABANG</option>
                                            <option value="14">LONDON</option>
                                            <option value="15">LOS ANGELES</option>
                                            <option value="16">MANILA</option>
                                            <option value="17">MELBOURNE</option>
                                            <option value="18">NAGOYA</option>
                                            <option value="19">NEW YORK</option>
                                            <option value="20">OSAKA</option>
                                            <option value="21">PENANG</option>
                                            <option value="22">PORT KLANG</option>
                                            <option value="23">PUSAN</option>
                                            <option value="24">QINGDAO</option>
                                            <option value="25">RPTTERDAM</option>
                                            <option value="26">SAN ANTONIO</option>
                                            <option value="27">SHAGHAI</option>
                                            <option value="28">SHIMIZU</option>
                                            <option value="29">SINGAPORE</option>
                                            <option value="30">TOKYO</option>
                                            <option value="31">VALENCIA</option>
                                            <option value="32">VALPARAISO</option>
                                            <option value="33">XIAMEN</option>
                                            <option value="34">YOKOHAMA</option>
                                        </select>
                                    </div>
                                </th>

                                <td>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <select name="containerSize" id="containerSize" class="form-control" >
                                            <option value="0">20</option>
                                            <option value="1">40</option>
                                        </select>
                                    </div>
                                </td>

                                <td>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <input type="number" id="freightRate" class="form-control" min={0} onChange={handleChangeFreight} value={freight} />
                                    </div>
                                </td>
                                <td>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <input type="number" id="effRate" class="form-control" min={0} onChange={handleChangeEff} value={eff} />
                                    </div>
                                </td>
                                <td>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <input type="number" id="otherRate" class="form-control" min={0} onChange={handleChangeOther} value={other} />
                                    </div>
                                </td>

                                <td>{parseInt(freight) + parseInt(eff) + parseInt(other)}</td>

                                <td>
                                    <div class="form-outline" style={{ border: '1px solid #cbcbcb', borderRadius: '5px' }}>
                                        <select name="shippingLine" id="shippingLine" class="form-control">
                                            <option value="0">COSCO</option>
                                            <option value="1">DELMEGE</option>
                                            <option value="2">MCLARENS</option>
                                            <option value="3">ONE</option>
                                            <option value="4">OOCL</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div align="right" width="100%">
                        <button class="btn btn-primary" type="button" >ADD RECORD</button>
                    </div>

                </div>

            </div>

            <br />

            {/* Customer Records */}

            <div class="accordion" id="accordionExample">

                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                        >
                            Customer #1
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-mdb-parent="#accordionExample">
                        <div class="accordion-body">
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
                                    <tr>
                                        <th scope='row'>CNSHA</th>
                                        <td>20</td>
                                        <td>101</td>
                                        <td>ONE</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>JPNGO</th>
                                        <td>20</td>
                                        <td>250</td>
                                        <td>OOCL</td>
                                    </tr>
                                    <tr>
                                        <th scope='row'>HKHKG</th>
                                        <td >40</td>
                                        <td>523</td>
                                        <td>WHLC</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Customer #2
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-mdb-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="accordion-body">
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
                                        <tr>
                                            <th scope='row'>CNSHA</th>
                                            <td>20</td>
                                            <td>101</td>
                                            <td>ONE</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>JPNGO</th>
                                            <td>20</td>
                                            <td>250</td>
                                            <td>OOCL</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>HKHKG</th>
                                            <td >40</td>
                                            <td>523</td>
                                            <td>WHLC</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Customer #3
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-mdb-parent="#accordionExample">
                        <div class="accordion-body">
                            <div class="accordion-body">
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
                                        <tr>
                                            <th scope='row'>CNSHA</th>
                                            <td>20</td>
                                            <td>101</td>
                                            <td>ONE</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>JPNGO</th>
                                            <td>20</td>
                                            <td>250</td>
                                            <td>OOCL</td>
                                        </tr>
                                        <tr>
                                            <th scope='row'>HKHKG</th>
                                            <td >40</td>
                                            <td>523</td>
                                            <td>WHLC</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Contract