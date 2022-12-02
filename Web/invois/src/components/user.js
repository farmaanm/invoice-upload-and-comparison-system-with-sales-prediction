import React, { useState } from 'react';
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

function contractData() {

    var x = document.getElementById('contractDataDisplay');
    var y = document.getElementById('spotDataDisplay');

    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
    } else {
        x.style.display = "none";
    }
}

function spotData() {

    var x = document.getElementById('contractDataDisplay');
    var y = document.getElementById('spotDataDisplay');

    if (y.style.display === "none") {
        x.style.display = "none";
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}

export default function App() {

    /*Contract Button*/
    const [isContract, setIsContract] = useState(false);

    const handleMouseEnterContract = () => {
        setIsContract(true);
    };
    const handleMouseLeaveContract = () => {
        setIsContract(false);
    };

    const contract = {
        width: '280px',
        borderRadius: '5px',
        padding: '20px',
        fontSize: '30px',
        fontFamily: 'Roboto',
        color: isContract ? 'white' : '#4F4F4F',
        backgroundColor: isContract ? '#381ce4' : 'white',   //after, before
        border: isContract ? '1px solid white' : '1px solid #4F4F4F'
    };

    /*Spot Button */
    const [isSpot, setIsSpot] = useState(false);

    const handleMouseEnterSpot = () => {
        setIsSpot(true);
    };
    const handleMouseLeaveSpot = () => {
        setIsSpot(false);
    };

    const spot = {
        width: '280px',
        borderRadius: '5px',
        padding: '20px',
        fontSize: '30px',
        fontFamily: 'Roboto',
        color: isSpot ? 'white' : '#4F4F4F',
        backgroundColor: isSpot ? '#381ce4' : 'white',   //after, before
        border: isSpot ? '1px solid white' : '1px solid #4F4F4F'
    };

    /*File Upload */
    const fileUpload = {
        border: '1px solid #381ce4',
        color: '#4f4f4f',
        padding: '20px',
        borderStyle: 'dashed',
        borderRadius: '5px',
        fontFamily: 'Roboto'
    }

    /*Contract File Validation*/
    const [disabledContract, setDisabledContract] = useState(true)

    function fileValidateContract() {
        if (document.getElementById('customerInvoiceContract').files.length !== 0 &&
            document.getElementById('paymentRequisitionContract').files.length !== 0 &&
            document.getElementById('rateContract').value !== 0) {
            setDisabledContract(false);
        }
    }

    /*Spot File Validation*/
    const [disabledSpot, setDisabledSpot] = useState(true)

    function fileValidateSpot() {
        if (document.getElementById('customerInvoiceSpot').files.length !== 0 &&
            document.getElementById('paymentRequisitionSpot').files.length !== 0) {
            setDisabledSpot(false);
        }
    }



    return (
        <div>

            <div style={{
                position: 'relative',
                height: '100px'
            }}>

                <div style={{ position: 'absolute', top: '20px', left: '60px' }}>
                    <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                    <span className="h1 fw-bold mb-0">Invois</span>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', right: '250px' }}>
                    <a href=''>Upload File</a>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                    <a href=''>History</a>
                </div>

                <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                    <a href=''>Log Out</a>
                </div>
            </div>

            <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>

            <div style={{ padding: '10px' }}>

                <table width={'70%'} align='center'>
                    <tr style={{ height: '50px' }}>
                        <td colspan={2} align='left' style={{ paddingLeft: '100px' }}>Select Contract Type:</td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                onMouseEnter={handleMouseEnterContract}
                                onMouseLeave={handleMouseLeaveContract}
                                onClick={contractData}
                                style={contract}
                                id='contractBtn'>
                                Contract</button>
                        </td>
                        <td>
                            <button
                                onMouseEnter={handleMouseEnterSpot}
                                onMouseLeave={handleMouseLeaveSpot}
                                onClick={spotData}
                                style={spot}
                                id='spotBtn'>
                                Spot</button>
                        </td>
                    </tr>
                </table>

            </div>

            <p><br /></p>

            <div style={{ padding: '10px' }} id="contractDataDisplay">
                <table width={'100%'}>
                    <tr style={{ height: '50px' }}>
                        <td width={'33%'} >
                            <label for='customerInvoiceContract'>Upload Customer Invoice:</label>
                        </td>
                        <td width={'33%'}>
                            <label for='paymentRequisitionContract'>Upload Payment Requisition:</label>
                        </td>
                        <td width={'33%'}>
                            Select Rate:
                        </td>
                    </tr>
                    <tr><td></td><td></td></tr>
                    <tr>
                        <td>
                            <input type='file'
                                name='customerInvoiceContract'
                                width='50px'
                                accept='application/pdf'
                                style={fileUpload}
                                id='customerInvoiceContract'
                                onChange={fileValidateContract} />
                        </td>
                        <td>
                            <input type='file'
                                name='paymentRequisitionContract'
                                width='50px'
                                accept='application/pdf'
                                style={fileUpload}
                                id='paymentRequisitionContract'
                                onChange={fileValidateContract} />
                        </td>
                        <td>
                            <select style={fileUpload} id='rateContract' onChange={fileValidateContract} >
                                <option value={0}>Rate</option>
                                <option value={1}>Rate 1</option>
                                <option value={2}>Rate 2</option>
                            </select>
                        </td>
                    </tr>

                </table>

                <p><br /></p>

                <div>
                    <MDBBtn disabled={disabledContract}>VALIDATE</MDBBtn>
                </div>
            </div>










            <div style={{ padding: '10px' }} id="spotDataDisplay">
                <table width={'100%'}>
                    <tr>
                        <td width={'33%'} >
                            <label for='customerInvoiceSpot'>Upload Customer Invoice:</label>
                        </td>
                        <td width={'33%'}>
                            <label for='paymentRequisitionSpot'>Upload Payment Requisition:</label>
                        </td>
                    </tr>
                    <tr><td></td><td></td></tr>
                    <tr>
                        <td>
                            <input type='file'
                                name='customerInvoiceSpot'
                                width='50px'
                                accept='application/pdf'
                                id="customerInvoiceSpot"
                                style={fileUpload}
                                onChange={fileValidateSpot} />
                        </td>
                        <td>
                            <input type='file'
                                name='paymentRequisitionSpot'
                                width='50px'
                                accept='application/pdf'
                                id="paymentRequisitionSpot"
                                style={fileUpload}
                                onChange={fileValidateSpot} />
                        </td>
                    </tr>

                </table>

                <p><br /></p>

                <div>
                    <MDBBtn disabled={disabledSpot}>VALIDATE</MDBBtn>
                </div>
            </div>



        </div>
    );
}
