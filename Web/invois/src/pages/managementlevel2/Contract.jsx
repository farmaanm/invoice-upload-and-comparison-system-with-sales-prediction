import React, { useState } from 'react';
import { MDBAccordion, MDBAccordionItem, MDBTable, MDBTableHead, MDBTableBody, MDBCollapse, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Contract() {

    /* 'Add Customer' Toggle Button */
    const [showShow, setShowShow] = useState(false);
    const toggleShow = () => setShowShow(!showShow);

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

    /* Disabling Past Dates */
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const todayDate = year + '-' + (month + 1) + '-' + day;
    console.log(todayDate);

    return (
        <div style={{ padding: '2%' }}>

            Add Contract Page <br />

            <div>
                <div align="right" width="100%"><MDBBtn onClick={toggleShow}>Add Customer</MDBBtn></div>

                <div>
                    <MDBCollapse show={showShow}>

                        <MDBTable striped hover>

                            <MDBTableHead>
                                <tr>
                                    <th scope='col' colSpan={2}>
                                        <MDBInput label='Customer Name' id='customerName' type='text' />
                                    </th>
                                    <th scope='col'>
                                        <MDBInput label='Validity Period' id='validity' type='date' min={todayDate} />
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
                            </MDBTableHead>

                            <MDBTableBody>
                                <tr>
                                    <th scope='row'>
                                        <select name="destination" id="destination">
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
                                    </th>

                                    <td>
                                        <select name="containerSize" id="containerSize">
                                            <option value="0">20</option>
                                            <option value="1">40</option>
                                        </select>
                                    </td>

                                    <td><MDBInput id='freightRate' type='number' min={0} onChange={handleChangeFreight} value={freight} /></td>
                                    <td><MDBInput id='effRate' type='number' min={0} onChange={handleChangeEff} value={eff} /></td>
                                    <td><MDBInput id='otherRate' type='number' min={0} onChange={handleChangeOther} value={other} /></td>

                                    <td>{parseInt(freight) + parseInt(eff) + parseInt(other)}</td>

                                    <td>
                                        <select name="shippingLine" id="shippingLine">
                                            <option value="0">COSCO</option>
                                            <option value="1">DELMEGE</option>
                                            <option value="2">MCLARENS</option>
                                            <option value="3">ONE</option>
                                            <option value="4">OOCL</option>
                                        </select>
                                    </td>
                                </tr>

                            </MDBTableBody>

                        </MDBTable>

                    </MDBCollapse>
                </div>
            </div>


            <MDBAccordion alwaysOpen initialActive={0}>

                <MDBAccordionItem collapseId={1} headerTitle='Customer #1' >

                    <MDBTable striped hover>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>Destination</th>
                                <th scope='col'>Container Size</th>
                                <th scope='col'>Rate (USD)</th>
                                <th scope='col'>Shipping Line</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
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
                        </MDBTableBody>
                    </MDBTable>

                </MDBAccordionItem>

                <MDBAccordionItem collapseId={2} headerTitle='Customer #2' >

                    <MDBTable striped hover>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>Destination</th>
                                <th scope='col'>Container Size</th>
                                <th scope='col'>Rate</th>
                                <th scope='col'>Shipping Line</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <th scope='row'>1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope='row'>2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope='row'>3</th>
                                <td >Larry the</td>
                                <td>Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>

                </MDBAccordionItem>

            </MDBAccordion>

        </div>
    );
}

export default Contract