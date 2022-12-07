import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';



export default function App() {

    /*On Load Function*/
    useEffect(() => {
        contractData();
    }, [])

    /*Contract Button Select*/
    const [isContract, setIsContract] = useState(false);

    /*Display Contract Form*/
    function contractData() {

        var x = document.getElementById('contractDataDisplay');
        var y = document.getElementById('spotDataDisplay');

        if (x.style.display === "none") {
            x.style.display = "block";
            y.style.display = "none";
            setIsContract(true);
            setIsSpot(false);
        } else {
            x.style.display = "none";
            setIsContract(false);
        }
    }

    /*Contract Button Style*/
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

    /*Spot Button Select*/
    const [isSpot, setIsSpot] = useState(false);

    /*Display Spot Form*/
    function spotData() {

        var x = document.getElementById('contractDataDisplay');
        var y = document.getElementById('spotDataDisplay');

        if (y.style.display === "none") {
            x.style.display = "none";
            y.style.display = "block";
            setIsSpot(true);
            setIsContract(false);
        } else {
            y.style.display = "none";
            setIsSpot(false);
        }
    }

    /*Spot Button Style*/
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

    /*File Upload Style*/
    const fileUpload = {
        border: '1px solid #381ce4',
        color: '#4f4f4f',
        padding: '20px',
        borderStyle: 'dashed',
        borderRadius: '5px',
        fontFamily: 'Roboto'
    }

    /*Contract, Validation Button Enable, Disable*/
    const [disabledContract, setDisabledContract] = useState(true)

    function fileValidateContract() {
        if (document.getElementById('customerInvoiceContract').files.length !== 0 &&
            document.getElementById('paymentRequisitionContract').files.length !== 0 &&
            document.getElementById('rateContract').value !== 0) {
            setDisabledContract(false);
        }
    }

    /*Spot, Validation Button Enable, Disable*/
    const [disabledSpot, setDisabledSpot] = useState(true)

    function fileValidateSpot() {
        if (document.getElementById('customerInvoiceSpot').files.length !== 0 &&
            document.getElementById('paymentRequisitionSpot').files.length !== 0) {
            setDisabledSpot(false);
        }
    }

    /*Success, Unsuccess Message */
    const [centredModalSuccess, setCentredModalSuccess] = useState(false);  //Success Validation
    const [centredModalUnuccess, setCentredModalUnuccess] = useState(false);  //Unuccess Validation

    const toggleShowSuccess = () => setCentredModalSuccess(!centredModalSuccess);
    const toggleShowUnuccess = () => setCentredModalUnuccess(!centredModalUnuccess);

    /*Contract Validate Button Validation Success, Unsuccess Message*/
    function validateContract() {

        //Send to Database

        //if database success: 
        toggleShowSuccess();
        document.getElementById('customerInvoiceContract').value = "";
        document.getElementById('paymentRequisitionContract').value = "";
        document.getElementById('rateContract').value = 0;
        setDisabledContract(true);
        fileValidateContract();

        //else:
        //toggleShowUnuccess();
    }

    /*Spot Validate Button Validation Success, Unsuccess Message*/
    function validateSpot() {

        //Send to Database

        //if database success: 
        toggleShowSuccess();
        document.getElementById('customerInvoiceSpot').value = "";
        document.getElementById('paymentRequisitionSpot').value = "";
        setDisabledSpot(true);
        fileValidateSpot();

        //else:
        //toggleShowUnuccess();
    }


    return (

        <div>

            <div style={{ padding: '10px' }}>

                <table width={'70%'} align='center'>
                    <tr style={{ height: '50px' }}>
                        <td colspan={2} align='left' style={{ paddingLeft: '100px' }}>Select Contract Type:</td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                onClick={contractData}
                                style={contract}
                                id='contractBtn'>
                                Contract</button>
                        </td>
                        <td>
                            <button
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
                    <MDBBtn disabled={disabledContract} onClick={validateContract}>VALIDATE</MDBBtn>
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
                    <MDBBtn disabled={disabledSpot} type='submit' onClick={validateSpot}>VALIDATE</MDBBtn>
                </div>
            </div>


            <MDBModal tabIndex='-1' show={centredModalSuccess} setShow={setCentredModalSuccess}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader style={{ backgroundColor: '#dff0d5' }}>
                            <MDBModalTitle>Confirmation</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowSuccess}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody style={{ backgroundColor: '#dff0d5' }}>
                            <MDBIcon fas icon="clipboard-check" style={{ color: '#55804c', fontSize: '50px' }} />
                            <p style={{ color: '#55804c', fontFamily: "Tahoma", fontSize: '20px' }}>
                                <br />
                                Validation Successful!
                            </p>
                        </MDBModalBody>

                        <MDBModalFooter style={{ backgroundColor: '#dff0d5' }} />

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MDBModal tabIndex='-1' show={centredModalUnuccess} setShow={setCentredModalUnuccess}>
                <MDBModalDialog centered >
                    <MDBModalContent >
                        <MDBModalHeader style={{ backgroundColor: '#f2dede' }}>
                            <MDBModalTitle>Confirmation</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShowUnuccess}></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalBody style={{ backgroundColor: '#f2dede' }}>
                            <MDBIcon fas icon="clipboard" style={{ color: '#ab5473', fontSize: '50px' }} />
                            <p style={{ color: '#ab5473', fontFamily: "Tahoma", fontSize: '20px' }}>
                                <br />
                                Oops! Try Again
                            </p>
                        </MDBModalBody>

                        <MDBModalFooter style={{ backgroundColor: '#f2dede' }} />

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>

    );
}
