import { db } from '../../../firebase'
import { doc, collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, arrayRemove, query, orderBy, where } from 'firebase/firestore'

export async function getCustomerRecords() {

    const getDataRefContract = collection(db, "Customer");
    const q = query(getDataRefContract, orderBy("customerName"));

    const data = await getDocs(q);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

export async function getHistoryRecords() {

    const getDataRefContract = collection(db, "Contract");
    const q = query(getDataRefContract, orderBy('timestamp', 'desc'));

    const data = await getDocs(q);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

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
        } else {
            // doc.data() will be undefined in this case
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
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
}

export async function addUpdateCustomer(customerName, validity, record) {

    const dataRef = collection(db, "Customer");
    let message = ''

    const p = query(dataRef, where("customerName", "==", customerName));
    const querySnapshot = await getDocs(p);

    /* Checking if Customer name exists */
    if (!querySnapshot.empty) {
        //console.log("Found")
        //const recordAdd = { containerSize: containerSize, destination: destination, rate: totalValue, shippingLine: shippingLine };

        querySnapshot.forEach(async (docFile) => {

            const customerRef = doc(db, "Customer", docFile.id);

            let records_array = docFile.data().records
            //console.log("Records Array: ", records_array)
            //console.log(typeof(records_array))

            /* Appending new record to existing record */
            let newRecord = records_array.push(record[0])

            await updateDoc(customerRef, {
                records: records_array,
                validity: validity
            });
            message = 'Recorded updated successfully!'
        });

    } else {
        /* If customer name does not exist, add new record */
        //console.log("Not found")
        try {
            const docRef = await addDoc(dataRef, {
                customerName: customerName,
                validity: validity,
                records: record
            });
            message = 'Recorded added successfully!'
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return message
}

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

export async function deleteCustomerRecord(id) {

    let message = ''

    await deleteDoc(doc(db, "Customer", id));

    message = 'Customer deleted successfully!'

    return message
}

export async function getPaymentPending() {

    const getDataRef = collection(db, "Contract");
    const qry = query(getDataRef, where("status", "==", "Approved"), where("paymentStatus", "==", "Pending"));

    const data = await getDocs(qry);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

export async function getPaymentDone() {

    const getDataRef = collection(db, "Contract");
    const qry = query(getDataRef, where("status", "==", "Approved"), where("paymentStatus", "==", "Done"));

    const data = await getDocs(qry);

    return data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() }))

}

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
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

}

