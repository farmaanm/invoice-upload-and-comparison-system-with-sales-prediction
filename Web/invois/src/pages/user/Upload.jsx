import React, { useState, useEffect } from 'react';
import {
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import LoadingScreen from '../../loading/LoadingScreen';
import processingGif from '../../images/processingGif.gif'

export default function Upload() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    let [payReq, setPayReq] = useState([])
    let [cusInv, setCusInv] = useState([])
    let [validationStatus, setValidationStatus] = useState([])

    useEffect(() => {
        /* Timeout for Loading Screen */
        setTimeout(() => setLoading(false), 1000) //1s

        if (payReq !== "" && cusInv !== "") {
            validateData()

            displayMessage(validationStatus)
        }
    }, [validationStatus, cusInv, payReq]);


    /*On Load Function*/
    /*useEffect(() => {
        contractData();
    }, [])*/

    /*Contract Button Select*/
    //const [isContract, setIsContract] = useState(false);

    /*Display Contract Form*/
    /*function contractData() {

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
    }*/

    /*Contract Button Style*/
    /*const contract = {
        width: '280px',
        borderRadius: '5px',
        padding: '20px',
        fontSize: '30px',
        fontFamily: 'Roboto',
        color: isContract ? 'white' : '#4F4F4F',
        backgroundColor: isContract ? '#381ce4' : 'white',   //after, before
        border: isContract ? '1px solid white' : '1px solid #4F4F4F'
    };*/

    /*Spot Button Select*/
    //const [isSpot, setIsSpot] = useState(false);

    /*Display Spot Form*/
    /*function spotData() {

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
    }*/

    /*Spot Button Style*/
    /*const spot = {
        width: '280px',
        borderRadius: '5px',
        padding: '20px',
        fontSize: '30px',
        fontFamily: 'Roboto',
        color: isSpot ? 'white' : '#4F4F4F',
        backgroundColor: isSpot ? '#381ce4' : 'white',   //after, before
        border: isSpot ? '1px solid white' : '1px solid #4F4F4F'
    };*/

    /*File Upload Style*/
    const fileUpload = {
        border: '1px solid #381ce4',
        color: '#4f4f4f',
        backgroundColor: '#F5F5F5',
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

    /*****************************Setting File name On Change********************************* */
    const [fileCustomerInvoice, setFileCustomerInvoice] = useState()
    const [filePaymentRequisition, setFilePaymentRequisition] = useState()

    function setCustomerInvoice(event) {
        fileValidateSpot()
        setFileCustomerInvoice(event.target.files[0])
    }

    function setPaymentRequisition(event) {
        fileValidateSpot()
        setFilePaymentRequisition(event.target.files[0])
    }

    console.log(fileCustomerInvoice)
    console.log(filePaymentRequisition)
    /******************************************************************************* */


    /*Success, Unsuccess Message */
    const [centredModalSuccess, setCentredModalSuccess] = useState(false);  //Success Validation
    const [centredModalUnuccess, setCentredModalUnuccess] = useState(false);  //Unuccess Validation
    const [centredModalProccessing, setCentredModalProccessing] = useState(false);  //Proccessing Validation

    const toggleShowSuccess = () => setCentredModalSuccess(!centredModalSuccess);
    const toggleShowUnuccess = () => setCentredModalUnuccess(!centredModalUnuccess);
    const toggleShowProccessing = () => setCentredModalProccessing(!centredModalProccessing);

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

    /*********************************Extracting Payment Requisition Data******************** */
    //let [payReq, setPayReq] = useState([])
    async function getPayReq(filePath) {

        //let response = await fetch('http://127.0.0.1:8000/salesprediction')

        let response = await fetch('http://127.0.0.1:8000/extractPayReq?pdfname=' + filePath)
        let data = await response.json()
        setPayReq(data)
        //console.log(data)

    }
    console.log(payReq)
    /***************************************************************************************** */


    /*********************************Extracting Customer Invoice Data******************** */
    //let [cusInv, setCusInv] = useState([])
    const mindeeSubmit = async (evt) => {
        //evt.preventDefault()
        //let myFileInput = document.getElementById('my-file-input');
        //let myFile = myFileInput.files[0]
        let myFile = fileCustomerInvoice
        if (!myFile) { return }
        let data = new FormData();
        data.append("document", myFile, myFile.name);

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                //console.log(this.responseText);

                const myJSON = this.responseText;
                const myObj = JSON.parse(myJSON);
                //console.log(typeof (myJSON))

                var p = myObj.document.inference.prediction.invoice_number.values[0].content;
                var q = myObj.document.inference.prediction.total_value.values[0].content;
                var r = myObj.document.inference.prediction.invoice_date.values[0].content;

                var customer = ""
                var vendor = ""

                for (var i = 0; i < myObj.document.inference.prediction.company_address.values.length; i++) {
                    customer = customer + ' ' + myObj.document.inference.prediction.company_address.values[i].content
                }

                for (var j = 0; j < myObj.document.inference.prediction.vendor_address.values.length; j++) {
                    vendor = vendor + ' ' + myObj.document.inference.prediction.vendor_address.values[j].content
                }

                //console.log(p)
                //console.log(q)
                //console.log(r)
                //console.log(customer)
                //console.log(vendor)

                let cusInvStr = '{"invoice_no":"' + p + '","customer_details":"' + customer + '","invoice_date":"' + r + '","document_issued_by":"' + vendor + '","total_value":"' + q + '"}'
                setCusInv(cusInvStr)
            }
        });

        xhr.open("POST", "https://api.mindee.net/v1/products/farmaan/multiple_invoice/v1/predict");
        xhr.setRequestHeader("Authorization", "Token bdc0964cbb927b59c50f90614b34eced");
        xhr.send(data);
    }
    console.log(cusInv)
    /***************************************************************************************** */


    /*********************************Validating Invoice Data******************************** */
    //let [validationStatus, setValidationStatus] = useState([])
    async function validateData() {

        cusInv = String(cusInv)
        payReq = String(payReq)

        cusInv = cusInv.replace("&", "%26");
        payReq = payReq.replace("&", "%26");

        let response = await fetch('http://127.0.0.1:8000/validateData?cusInvStr=' + cusInv + '&payReqStr=' + payReq)
        let data = await response.json()
        setValidationStatus(data)
        console.log(data)
    }
    console.log(validationStatus)
    /***************************************************************************************** */

    function refreshPage() {
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
            //your code to be executed after 1 second
            window.location.reload(false);
        }, delayInMilliseconds);

    }

    async function displayMessage(validation) {
        if (validation === "True") {
            //Send to Database

            //if database success: 
            toggleShowProccessing();
            toggleShowSuccess();
            document.getElementById('customerInvoiceSpot').value = "";
            document.getElementById('paymentRequisitionSpot').value = "";
            setDisabledSpot(true);
            fileValidateSpot();
        }
        else if (validation === "False") {
            toggleShowProccessing();
            toggleShowUnuccess();
            document.getElementById('customerInvoiceSpot').value = "";
            document.getElementById('paymentRequisitionSpot').value = "";
            setDisabledSpot(true);
            fileValidateSpot();
        }
    }

    /*Spot Validate Button Validation Success, Unsuccess Message*/
    async function validateSpot(e) {
        e.preventDefault();

        toggleShowProccessing();
        await mindeeSubmit()
        await getPayReq(filePaymentRequisition.name)

    }





    return (
        <>

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
                        <a href='/upload' style={{ textDecoration: 'underline' }}>Upload File</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '150px' }}>
                        <a href="/history">History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '10px', right: '60px' }}>
                        <a href="/">Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

            {loading === false ? (
                <div>

                    {/* File Upload */}
                    <div style={{ padding: '5%' }}>
                        { /*
                        <>
                        <div style={{ padding: '10px' }}>

                            <table width={'70%'} align='center'>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td colSpan={2} align='left' style={{ paddingLeft: '100px' }}>Select Contract Type:</td>
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
                                </tbody>
                            </table>

                        </div> 

                        <p><br /></p>

                        <div style={{ padding: '10px' }} id="contractDataDisplay">
                            <table width={'100%'}>
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td width={'33%'} >
                                            <label htmlFor='customerInvoiceContract'>Upload Customer Invoice:</label>
                                        </td>
                                        <td width={'33%'}>
                                            <label htmlFor='paymentRequisitionContract'>Upload Payment Requisition:</label>
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
                                </tbody>
                            </table>

                            <p><br /></p>

                            <div>
                                <MDBBtn disabled={disabledContract} onClick={validateContract}>VALIDATE</MDBBtn>
                            </div>
                        </div>


                        <div style={{ padding: '10px' }} id="spotDataDisplay">
                            <table width={'100%'}>
                                <tbody>
                                    <tr>
                                        <td width={'33%'} >
                                            <label htmlFor='customerInvoiceSpot'>Upload Customer Invoice:</label>
                                        </td>
                                        <td width={'33%'}>
                                            <label htmlFor='paymentRequisitionSpot'>Upload Payment Requisition:</label>
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
                                </tbody>
                            </table>

                            <p><br /></p>

                            <div>
                                <MDBBtn disabled={disabledSpot} type='submit' onClick={validateSpot}>VALIDATE</MDBBtn>
                            </div>
                        </div>
                        </>
                        */ }

                        {/* Success Modal */}
                        <MDBModal tabIndex='-1' show={centredModalSuccess} setShow={setCentredModalSuccess}>
                            <MDBModalDialog centered>
                                <MDBModalContent>
                                    <MDBModalHeader style={{ backgroundColor: '#dff0d5' }}>
                                        <MDBModalTitle>Confirmation</MDBModalTitle>
                                        {/*<MDBBtn className='btn-close' color='none' onClick={toggleShowSuccess}></MDBBtn>*/}
                                        <button className='btn-close' color='none' onClick={() => { toggleShowSuccess(); refreshPage(); }}></button>
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

                        {/* Unsuccess Modal */}
                        <MDBModal tabIndex='-1' show={centredModalUnuccess} setShow={setCentredModalUnuccess}>
                            <MDBModalDialog centered >
                                <MDBModalContent >
                                    <MDBModalHeader style={{ backgroundColor: '#f2dede' }}>
                                        <MDBModalTitle>Confirmation</MDBModalTitle>
                                        {/*<MDBBtn className='btn-close' color='none' onClick={toggleShowUnuccess}></MDBBtn>*/}
                                        <button className='btn-close' color='none' onClick={() => { toggleShowUnuccess(); refreshPage(); }}></button>
                                    </MDBModalHeader>

                                    <MDBModalBody style={{ backgroundColor: '#f2dede' }}>
                                        <MDBIcon fas icon="clipboard" style={{ color: '#ab5473', fontSize: '50px' }} />
                                        <p style={{ color: '#ab5473', fontFamily: "Tahoma", fontSize: '20px' }}>
                                            <br />
                                            Data mismatched. Please retry again!
                                        </p>
                                    </MDBModalBody>

                                    <MDBModalFooter style={{ backgroundColor: '#f2dede' }} />

                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>

                        {/* Proccessing Modal */}
                        <MDBModal tabIndex='-1' show={centredModalProccessing} setShow={setCentredModalProccessing}>
                            <MDBModalDialog centered >
                                <MDBModalContent >
                                    <MDBModalHeader style={{ backgroundColor: '#fbf0da' }}>
                                        <MDBModalTitle>Processing...</MDBModalTitle>
                                        {/*<MDBBtn className='btn-close' color='none' onClick={toggleShowUnuccess}></MDBBtn>*/}
                                        {/*<button className='btn-close' color='none' onClick={toggleShowProccessing}></button>*/}
                                    </MDBModalHeader>

                                    <MDBModalBody style={{ backgroundColor: '#fbf0da' }}>
                                        {/*<MDBIcon fas icon="clock" style={{ color: '#8f681d', fontSize: '50px' }} />*/}
                                        <img src={processingGif} alt="processing gif" style={{height:'70px'}}/>
                                        <p style={{ color: '#8f681d', fontFamily: "Tahoma", fontSize: '20px' }}>
                                            <br />
                                            Data is being Extracted...
                                        </p>
                                    </MDBModalBody>

                                    <MDBModalFooter style={{ backgroundColor: '#fbf0da' }} />

                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>


                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active"
                                    id="ex3-tab-1"
                                    data-mdb-toggle="pill"
                                    href="#ex3-pills-1"
                                    role="tab"
                                    aria-controls="ex3-pills-1"
                                    aria-selected="true"
                                >Contract</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="nav-link"
                                    id="ex3-tab-2"
                                    data-mdb-toggle="pill"
                                    href="#ex3-pills-2"
                                    role="tab"
                                    aria-controls="ex3-pills-2"
                                    aria-selected="false"
                                >Spot</a>
                            </li>
                        </ul>

                        
                        <br/>

                        <div className="tab-content" id="ex2-content">

                            {/* Contract Invoice Upload */}
                            <div className="tab-pane fade show active"
                                id="ex3-pills-1"
                                role="tabpanel"
                                aria-labelledby="ex3-tab-1"
                            >
                                <div style={{ padding: '10px' }} id="contractDataDisplay">
                                    <table width={'100%'}>
                                        <tbody>
                                            <tr style={{ height: '50px' }}>
                                                <td width={'33%'} >
                                                    <label htmlFor='customerInvoiceContract'>Upload Customer Invoice:</label>
                                                </td>
                                                <td width={'33%'}>
                                                    <label htmlFor='paymentRequisitionContract'>Upload Payment Requisition:</label>
                                                </td>
                                                <td width={'33%'}>
                                                    Select Rate:
                                                </td>
                                            </tr>

                                            <tr></tr>

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
                                        </tbody>
                                    </table>

                                    <p><br /></p>

                                    <div>
                                        <button className="btn btn-primary" disabled={disabledContract} onClick={validateContract}>VALIDATE</button>
                                    </div>
                                </div>
                            </div>

                            {/* Spot Invoice Upload */}
                            <div
                                className="tab-pane fade"
                                id="ex3-pills-2"
                                role="tabpanel"
                                aria-labelledby="ex3-tab-2"
                            >
                                <div style={{ padding: '10px' }} id="spotDataDisplay">
                                    <table width={'100%'}>
                                        <tbody>
                                            <tr style={{ height: '50px' }}>
                                                <td width={'33%'} >
                                                    <label htmlFor='customerInvoiceSpot'>Upload Customer Invoice:</label>
                                                </td>
                                                <td width={'33%'}>
                                                    <label htmlFor='paymentRequisitionSpot'>Upload Payment Requisition:</label>
                                                </td>
                                            </tr>

                                            <tr></tr>

                                            <tr>
                                                {/* Payment Requisition Upload */}
                                                <td>
                                                    <input type='file'
                                                        name='customerInvoiceSpot'
                                                        width='50px'
                                                        accept='application/pdf'
                                                        id="customerInvoiceSpot"
                                                        style={fileUpload}
                                                        onChange={setCustomerInvoice} />
                                                </td>

                                                {/* Customer Invoice Upload */}
                                                <td>
                                                    <input type='file'
                                                        name='paymentRequisitionSpot'
                                                        width='50px'
                                                        accept='application/pdf'
                                                        id="paymentRequisitionSpot"
                                                        style={fileUpload}
                                                        onChange={setPaymentRequisition} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p><br /></p>

                                    <div>
                                        {/* Submit Button */}
                                        {/*<MDBBtn disabled={disabledSpot} type='button' onClick={validateSpot}>VALIDATE</MDBBtn>*/}
                                        <button disabled={disabledSpot} type='button' className="btn btn-primary" onClick={validateSpot}>VALIDATE</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            ) : (
                <LoadingScreen />
            )}
        </>
    );
}
