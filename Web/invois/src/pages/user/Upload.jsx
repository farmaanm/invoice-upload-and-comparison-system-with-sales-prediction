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

import successGif from '../../images/successGif.gif';
import unsuccessGif from '../../images/unsuccessGif.gif';
import processingGif from '../../images/processingGif.gif';

import { signOut } from 'firebase/auth';
import { db, storage, auth } from '../../firebase'
import { collection, addDoc, doc, getDoc, getDocs, updateDoc, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function Upload() {

    /* Loading Screen */
    const [loading, setLoading] = useState(true)

    let [payReq, setPayReq] = useState([])
    let [cusInv, setCusInv] = useState([])
    let [validationStatus, setValidationStatus] = useState([])

    const getDataRefCustomer = collection(db, "Customer");
    const [showData, setShowData] = useState([]);

    const [mismatchedData, setMismatchedData] = useState('Global variable');

    //var mismatchedData = 'Global variable'

    useEffect(() => {
        /* Timeout for Loading Screen */
        setTimeout(() => setLoading(false), 4000) //4s

        const q = query(getDataRefCustomer, orderBy("customerName"));

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
        };

        getData();

        if (payReq !== "" && cusInv !== "") {
            validateData()
            displayMessage(validationStatus)
            if(validationStatus !== "True"){
                setMismatchedData(validationStatus)
            }
        }
    }, [validationStatus, cusInv, payReq]);

    //console.log(showData)

    /* Get Current User */
    let username = '';
    let user = auth.currentUser
    if (user) {
        let useremail = user.email
        console.log(useremail)
        username = useremail.split('@')[0]
    }

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

    /*Rate Style*/
    const rateStyle = {
        border: '1px solid #381ce4',
        color: '#4f4f4f',
        backgroundColor: '#F5F5F5',
        padding: '25px',
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

    /* Setting File name On Change */
    const [fileCustomerInvoice, setFileCustomerInvoice] = useState()
    const [filePaymentRequisition, setFilePaymentRequisition] = useState()
    const [rateValue, setRateValue] = useState(0)

    function setCustomerInvoice(event) {
        fileValidateSpot()
        fileValidateContract()
        setFileCustomerInvoice(event.target.files[0])
    }

    function setPaymentRequisition(event) {
        fileValidateSpot()
        fileValidateContract()
        setFilePaymentRequisition(event.target.files[0])
    }

    function setRate(event) {
        fileValidateContract()
        setRateValue(event.target.value)
    }

    console.log(fileCustomerInvoice)
    console.log(filePaymentRequisition)
    console.log(rateValue)


    /*Success, Unsuccess Message */
    const [centredModalSuccess, setCentredModalSuccess] = useState(false);  //Success Validation
    const [centredModalUnuccess, setCentredModalUnuccess] = useState(false);  //Unuccess Validation
    const [centredModalProccessing, setCentredModalProccessing] = useState(false);  //Proccessing Validation

    const toggleShowSuccess = () => setCentredModalSuccess(!centredModalSuccess);
    const toggleShowUnuccess = () => setCentredModalUnuccess(!centredModalUnuccess);
    const toggleShowProccessing = () => setCentredModalProccessing(!centredModalProccessing);



    /* Extracting Payment Requisition Data */
    async function getPayReq(filePath) {

        //let response = await fetch('http://127.0.0.1:8000/salesprediction')

        let response = await fetch('http://127.0.0.1:8000/extractPayReq?pdfname=' + filePath)
        let data = await response.json()
        setPayReq(data)
        //console.log(data)

    }
    console.log(payReq)

    /* Extracting Customer Invoice Data */
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

    /* Comparing and Validating Invoice Data */
    async function validateData() {

        cusInv = String(cusInv)
        payReq = String(payReq)

        cusInv = cusInv.replace("&", "%26");
        payReq = payReq.replace("&", "%26");

        let response = await fetch('http://127.0.0.1:8000/validateData?cusInvStr=' + cusInv + '&payReqStr=' + payReq)
        let data = await response.json()

        if (rateValue !== 0) {
            const obj = JSON.parse(cusInv);

            if (parseFloat(obj.total_value) === parseFloat(rateValue)) {
                data = "True"
            } else {
                data = "Rate: False"
            }
        }

        setValidationStatus(data)
        console.log(data)
    }
    console.log(validationStatus)

    /* Page Refreshing */
    function refreshPage() {
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
            window.location.reload(false);
        }, delayInMilliseconds);
    }

    /* Get Current Date and Time */
    function getDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        if (month.toString().length === 1) {
            month = '0' + month;
        }
        if (day.toString().length === 1) {
            day = '0' + day;
        }
        if (hour.toString().length === 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length === 1) {
            minute = '0' + minute;
        }
        if (second.toString().length === 1) {
            second = '0' + second;
        }

        var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;

        return dateTime;
    }

    const getDataRefContract = collection(db, "Contract");

    let payReqUrl = ""
    let cusInvUrl = ""

    //var mismatchedData = 'Global variable'

    /* Displaying Validtion Message and Send to DB */
    async function displayMessage(validation) {

        /* If Validation == True */
        if (validation === "True") {
            //Send to Database
            try {
                const storageRefPayReq = ref(storage, `/Payment Requisitions/${filePaymentRequisition.name}`)
                const uploadTaskPayReq = uploadBytesResumable(storageRefPayReq, filePaymentRequisition);

                const storageRefCusInv = ref(storage, `/Vendor Invoice/${fileCustomerInvoice.name}`)
                const uploadTaskCusInv = uploadBytesResumable(storageRefCusInv, fileCustomerInvoice);

                /* Payment Requisition File Upload */
                uploadTaskPayReq.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (err) => console.log(err),
                    () => {
                        // download url
                        getDownloadURL(uploadTaskPayReq.snapshot.ref).then((url) => {
                            payReqUrl = url;
                            console.log(url);
                        });
                    }
                );

                /* Customer Invoice File Upload */
                uploadTaskCusInv.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (err) => console.log(err),
                    () => {
                        // download url
                        getDownloadURL(uploadTaskCusInv.snapshot.ref).then((url) => {
                            cusInvUrl = url;
                            console.log(url);
                        });
                    }
                );

                setTimeout(async () => {

                    /* Send all data to DB */
                    const docRef = await addDoc(getDataRefContract, {
                        dateTime: getDateTime(),
                        paymentDoneAt: '',
                        paymentRequisitionName: filePaymentRequisition.name,
                        paymentRequisitionUrl: 'payReqUrl',
                        paymentStatus: 'Pending',
                        status: 'Pending',
                        statusMessage: 'warning',
                        uploadedBy: username,
                        vendorInvoiceName: fileCustomerInvoice.name,
                        vendorInvoiceUrl: 'cusInvUrl'
                    });

                    console.log("Pay Req = " + payReqUrl)
                    console.log("Cus Inv = " + cusInvUrl)

                    console.log("Document written with ID: ", docRef.id);

                    /* Update URL */
                    const contractRef = doc(db, "Contract", docRef.id);
                    const docSnap = await getDoc(contractRef);

                    if (docSnap.exists()) {
                        //console.log("Document data:", docSnap.data());
                        await updateDoc(contractRef, {
                            paymentRequisitionUrl: payReqUrl,
                            vendorInvoiceUrl: cusInvUrl
                        });
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                },6000)

            } catch (e) {
                console.error("Error adding document: ", e);
            }

            //if database success: 
            toggleShowProccessing();
            toggleShowSuccess();
            document.getElementById('customerInvoiceSpot').value = "";
            document.getElementById('paymentRequisitionSpot').value = "";

            document.getElementById('customerInvoiceContract').value = "";
            document.getElementById('paymentRequisitionContract').value = "";
            document.getElementById('rateContract').value = 0;

            setDisabledSpot(true);
            fileValidateSpot();

            setDisabledContract(true);
            fileValidateContract();
        }
        /* If Validation == False */
        else if (validation.includes("False")) {

            //mismatchedData = 'This is the mismatched data'

            toggleShowProccessing();
            toggleShowUnuccess();
            document.getElementById('customerInvoiceSpot').value = "";
            document.getElementById('paymentRequisitionSpot').value = "";

            setDisabledSpot(true);
            fileValidateSpot();

            setDisabledContract(true);
            fileValidateContract();
        }
    }

    /* Extracting Spot Invoice Data Function Call */
    async function validateSpot(e) {
        e.preventDefault();

        toggleShowProccessing();
        await mindeeSubmit()
        await getPayReq(filePaymentRequisition.name)

    }



    return (
        <>

            {/* Navigation Bar */}

            <div style={{position:'fixed', top:'0', width: '100%', backgroundColor:'#F4F4F4'}}>
                <div style={{
                    //position: 'relative',
                    height: '100px',
                    width: '100%'
                }}>

                    <div style={{ position: 'absolute', top: '30px', left: '60px' }}>
                        <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#381ce4' }} />
                        <span className="h1 fw-bold mb-0">Invois</span>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '240px' }}>
                        <a href='/upload' style={{ textDecoration: 'underline' }}>Upload File</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '150px' }}>
                        <a href="/history">History</a>
                    </div>

                    <div style={{ position: 'absolute', bottom: '45px', right: '60px' }}>
                        <a href="/" onClick={() => signOut(auth)}>Log out</a>
                    </div>
                </div>
                <hr style={{ height: '5px', backgroundColor: '#381ce4' }}></hr>
            </div>

            {loading === false ? (
                <div style={{marginTop:'130px'}}>

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
                                        {/*<MDBIcon fas icon="clipboard-check" style={{ color: '#55804c', fontSize: '50px' }} />*/}
                                        <img src={successGif} alt="processing gif" style={{ height: '70px' }} />
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
                                        <MDBModalTitle>Error</MDBModalTitle>
                                        {/*<MDBBtn className='btn-close' color='none' onClick={toggleShowUnuccess}></MDBBtn>*/}
                                        <button className='btn-close' color='none' onClick={() => { toggleShowUnuccess(); refreshPage(); }}></button>
                                    </MDBModalHeader>

                                    <MDBModalBody style={{ backgroundColor: '#f2dede' }}>
                                        {/*<MDBIcon fas icon="clipboard" style={{ color: '#ab5473', fontSize: '50px' }} />*/}
                                        <img src={unsuccessGif} alt="processing gif" style={{ height: '70px' }} />
                                        <p style={{ color: '#ab5473', fontFamily: "Tahoma", fontSize: '20px' }}>
                                            <br />
                                            Data mismatched. Please try again!
                                        </p>
                                        <p style={{ fontFamily: "Tahoma", fontSize: '15px' }}>
                                            {mismatchedData}
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
                                        <img src={processingGif} alt="processing gif" style={{ height: '70px' }} />
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


                        <br />

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
                                                {/* Customer Ivoice */}
                                                <td>
                                                    <input type='file'
                                                        name='customerInvoiceContract'
                                                        width='50px'
                                                        accept='application/pdf'
                                                        style={fileUpload}
                                                        id='customerInvoiceContract'
                                                        data-testid="contract-cusInv-input"
                                                        onChange={setCustomerInvoice} />
                                                </td>

                                                {/* Payment Requisition */}
                                                <td>
                                                    <input type='file'
                                                        name='paymentRequisitionContract'
                                                        width='50px'
                                                        accept='application/pdf'
                                                        style={fileUpload}
                                                        id='paymentRequisitionContract'
                                                        data-testid="contract-payReq-input"
                                                        onChange={setPaymentRequisition} />
                                                </td>

                                                {/* Rate */}
                                                <td>
                                                    <select style={rateStyle} id='rateContract' data-testid="contract-rate-input" onChange={setRate} >
                                                        {
                                                            showData.map(({ id, post }) => {
                                                                const destination = [];
                                                                const rate = [];

                                                                for (var i = 0; i < post.records.length; i++) {
                                                                    destination.push(post.records[i].destination)
                                                                    rate.push(post.records[i].rate)
                                                                }

                                                                return (
                                                                    <>
                                                                        {
                                                                            Object.values(post.records).map((rows, index) => {
                                                                                return (

                                                                                    <option value={rows.rate} key={index}>{post.customerName} | {rows.destination} | {rows.rate}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p><br /></p>

                                    <div>
                                        <button className="btn btn-primary" disabled={disabledContract} onClick={validateSpot}>VALIDATE</button>
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
                                                {/* Customer Invoice Upload */}
                                                <td>
                                                    <input type='file'
                                                        name='customerInvoiceSpot'
                                                        width='50px'
                                                        accept='application/pdf'
                                                        id="customerInvoiceSpot"
                                                        style={fileUpload}
                                                        data-testid="spot-cusInv-input"
                                                        onChange={setCustomerInvoice} />
                                                </td>

                                                {/* Payment Requisition Upload */}
                                                <td>
                                                    <input type='file'
                                                        name='paymentRequisitionSpot'
                                                        width='50px'
                                                        accept='application/pdf'
                                                        id="paymentRequisitionSpot"
                                                        style={fileUpload}
                                                        data-testid="spot-payReq-input"
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
