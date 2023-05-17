import { db } from '../../../firebase'
import { doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, arrayRemove, query, orderBy, where, serverTimestamp } from 'firebase/firestore'

/* Current Date and Time */
export function getDateTime() {
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

/* Add User */
export async function addUser(firstName, lastName, role, email) {

    const dataRef = collection(db, "User");

    try {
        const docRef = await addDoc(dataRef, {
            firstName: firstName,
            lastName: lastName,
            role: role,
            email: email,
            timestamp: serverTimestamp()
        });
        //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

/* Retrieve Invoice History */
export async function getHistoryRecords() {

    const getDataRefContract = collection(db, "Contract");
    const q = query(getDataRefContract, orderBy('timestamp', 'desc'));

    const data = await getDocs(q);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

/* Retrieve Customer */
export async function getCustomerRecords() {

    const getDataRefContract = collection(db, "Customer");
    const q = query(getDataRefContract, orderBy("customerName"));

    const data = await getDocs(q);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

/* Retrieve Payment Pending Invoices */
export async function getPaymentPending() {

    const getDataRef = collection(db, "Contract");
    const qry = query(getDataRef, where("status", "==", "Approved"), where("paymentStatus", "==", "Pending"));

    const data = await getDocs(qry);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

/* Retrieve Payment Done Invoices */
export async function getPaymentDone() {

    const getDataRef = collection(db, "Contract");
    const qry = query(getDataRef, where("status", "==", "Approved"), where("paymentStatus", "==", "Done"));

    const data = await getDocs(qry);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

/* Add Customer / Update Customer */
export async function addUpdateCustomer(customerName, validity, record) {

    const dataRef = collection(db, "Customer");
    let message = ''

    const p = query(dataRef, where("customerName", "==", customerName));
    const querySnapshot = await getDocs(p);

    /* Checking if Customer name exists - Update Customer */
    if (!querySnapshot.empty) {

        querySnapshot.forEach(async (docFile) => {

            const customerRef = doc(db, "Customer", docFile.id);

            let records_array = docFile.data().records
            //console.log("Records Array: ", records_array)

            /* Appending new record to existing record */
            let newRecord = records_array.push(record[0])

            await updateDoc(customerRef, {
                records: records_array,
                validity: validity
            });
            message = 'Recorded updated successfully!'
            //console.log("Document with id " + docFile.id + " updated")
        });

    } else {
        /* If customer name does not exist - Add new Customer */
        try {
            const docRef = await addDoc(dataRef, {
                customerName: customerName,
                validity: validity,
                records: record
            });
            message = 'Recorded added successfully!'
            //console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return message
}

/* Update Invoice Status (Approve/Reject) */
export async function updateContractStatus(id, fileStatus) {

    const contractRef = doc(db, "Contract", id);
    const docSnap = await getDoc(contractRef);

    /* If status == Approved */
    if (fileStatus === "Approved") {
        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            await updateDoc(contractRef, {
                status: "Approved",
                statusMessage: "success"
            });
            //console.log("Updated doc id: ", id);
        } else {
            console.log("No such document!");
        }
    } else {
        /* If status == Rejected */
        if (docSnap.exists()) {
            //console.log("Rejected", docSnap.data());
            await updateDoc(contractRef, {
                status: "Rejected",
                statusMessage: "danger"
            });
            //console.log("Updated doc id: ", id);
        } else {
            console.log("No such document!");
        }
    }
}

/* Update Payment status of Invoices */
export async function updatePaymentStatus(userinfo) {

    for (var key of Object.keys(userinfo.response)) {

        //console.log(key + " -> " + userinfo.response[key])

        const contractRef = doc(db, "Contract", userinfo.response[key]);
        const docSnap = await getDoc(contractRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            await updateDoc(contractRef, {
                paymentStatus: "Done",
                paymentDoneAt: getDateTime()
            });
            //console.log("Document updated with id: " + userinfo.response[key])
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

}

/* Delete Invoice Records */
export async function deleteInvoiceRecord(id) {

    let message = ''

    await deleteDoc(doc(db, "Contract", id));
    //console.log("Deleted document with id: " + id)
    message = 'Invoice record deleted successfully!'

    return message
}

/* Delete Customer */
export async function deleteCustomerRecord(id) {

    let message = ''

    await deleteDoc(doc(db, "Customer", id));
    //console.log("Document deleted with id: " + id)
    message = 'Customer deleted successfully!'

    return message
}

/* Delete Sub Record of Customer */
export async function deleteCustomerArray(id, index) {

    let message = ''

    const listingRef = doc(db, 'Customer', id);

    const docData = await getDoc(listingRef);
    //console.log(docData)
    //console.log(docData.data().records[index])

    const objectToBeRemoved = docData.data().records[index]

    try {
        await updateDoc(listingRef, {
            records: arrayRemove(objectToBeRemoved)
        });
        message = 'Recorded deleted successfully!'
    } catch (e) {
        console.log(e.message);
    }

    return message
}