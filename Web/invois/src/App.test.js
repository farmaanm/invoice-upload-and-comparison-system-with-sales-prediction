import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';

import Upload from '../src/pages/user/Upload';
import History from '../src/pages/user/History';

import Approve from '../src/pages/managementlevel2/Approve';
import Contract from '../src/pages/managementlevel2/Contract';

import HeadContract from '../src/pages/managementlevel1/HeadContract';
import HeadHistory from '../src/pages/managementlevel1/HeadHistory';
import Sales from '../src/pages/managementlevel1/Sales';

import Payment from '../src/pages/finance/Payment';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, getAuth } from 'firebase/auth';
import { async } from '@firebase/util';
import { collection, getDocs, query, where, doc, getDoc, updateDoc, orderBy } from 'firebase/firestore'
import { db } from './firebase'

import { addUpdateCustomer } from './pages/utils/dbOperations/dbOperations'


/**
 * @jest-environment node
 */

//afterAll(() => setTimeout(() => process.exit(1), 1000))

describe('Firebase Util Test Suite', () => {
    beforeAll(async () => {
        jest.setTimeout(10000);
    });

    const auth = getAuth()

    test('createUserWithEmailAndPassword should create an account', async () => {

        const user = await createUserWithEmailAndPassword(auth, 'test@user.com', 'test123');
        expect(user.user).toBeTruthy();

    });

    test('signInWithEmailAndPassword should throw error with invalid email', async () => {

        let error = '';

        try {
            await signInWithEmailAndPassword(auth, 'tesst@user.com', 'test123');
        } catch (err) {
            error = err.toString();
        }

        expect(error).toEqual('FirebaseError: Firebase: Error (auth/user-not-found).');
    });

    test('signInWithEmailAndPassword should throw error with wrong password', async () => {

        let error = '';

        try {
            await signInWithEmailAndPassword(auth, 'test@user.com', 'test12');
        } catch (err) {
            error = err.toString();
        }

        expect(error).toEqual('FirebaseError: Firebase: Error (auth/wrong-password).');
    });

    test('signInWithEmailAndPassword should login with correct credential', async () => {
        const user = await signInWithEmailAndPassword(auth, 'test@user.com', 'test123');
        expect(user.user).toBeTruthy();
    });

    test('signOutFirebase should log out the user', async () => {
        await signInWithEmailAndPassword(auth, 'test@user.com', 'test123');

        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    });

    test('deleteUser should delete user', async () => {
        await signInWithEmailAndPassword(auth, 'test@user.com', 'test123');

        const user = auth.currentUser;

        deleteUser(user).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    });
    
});


describe("Login and Signup", () => {

    test('login page', async () => {

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await expect(screen.getByText("Sign in")).toBeInTheDocument();

        let emailInput = screen.getByTestId("email-input");
        let passwordInput = screen.getByTestId("password-input");

        let loginButton = await expect(screen.getByText("Login")).toBeInTheDocument();

        await expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        await expect(screen.getByText("Sign Up")).toBeInTheDocument();

    });

    test('signup page', async () => {

        render(
            <BrowserRouter>
                <Signup />
            </BrowserRouter>
        );

        await expect(screen.getByText("Sign up")).toBeInTheDocument();

        let emailInput = screen.getByTestId("email-input");
        let passwordInput = screen.getByTestId("password-input");
        let repeatPasswordInput = screen.getByTestId("repeat-password-input");

        await expect(screen.getByText("Register")).toBeInTheDocument();

        await expect(screen.getByText("Already have an account?")).toBeInTheDocument();
        await expect(screen.getByText("Sign In")).toBeInTheDocument();

    });
});

describe("This suite is to test the User Level 1", () => {

    describe("Upload", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@user.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });


        test('rendering nav bar', async () => {

            const { getByText } = render(<Upload />);
            await setTimeout(5000);
            expect(getByText("Upload File")).toBeInTheDocument("Upload File")
            expect(getByText("History")).toBeInTheDocument("History")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<Upload />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test('upload page', async () => {

            render(<Upload />);

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                Upload.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

            await expect(screen.getByText("Contract")).toBeInTheDocument();
            await expect(screen.getByText("Spot")).toBeInTheDocument();

            await expect(screen.getAllByText("Upload Customer Invoice:"));
            await expect(screen.getAllByText("Upload Payment Requisition:"));
            await expect(screen.getByText("Select Rate:")).toBeInTheDocument();

            await expect(screen.getAllByText("VALIDATE"));

            let contractCusInv = screen.getByTestId("contract-cusInv-input");
            let contractPayReq = screen.getByTestId("contract-payReq-input");
            let contractRate = screen.getByTestId("contract-rate-input");

            let spotCusInv = screen.getByTestId("spot-cusInv-input");
            let spotPayReq = screen.getByTestId("spot-payReq-input");

        });

        test('validation modals', async () => {

            render(<Upload />);

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                Upload.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

            await expect(screen.getByText("Confirmation")).toBeInTheDocument();
            await expect(screen.getByText("Validation Successful!")).toBeInTheDocument();

            await expect(screen.getByText("Error")).toBeInTheDocument();
            await expect(screen.getByText("Data mismatched. Please try again!")).toBeInTheDocument();

            await expect(screen.getByText("Processing...")).toBeInTheDocument();
            await expect(screen.getByText("Data is being Extracted...")).toBeInTheDocument();

        });
    });

    describe("History", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@user.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });

        test('rendering nav bar', () => {

            const { getByText } = render(<History />);

            expect(getByText("Upload File")).toBeInTheDocument("Upload File")
            expect(getByText("History")).toBeInTheDocument("History")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<History />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test('history page', async () => {

            render(<History />);

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                History.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

            await expect(screen.getByText("Vendor Invoice")).toBeInTheDocument();
            await expect(screen.getByText("Payment Requisition")).toBeInTheDocument();
            await expect(screen.getByText("Status")).toBeInTheDocument();
            await expect(screen.getByText("Uploaded At")).toBeInTheDocument();
            await expect(screen.getByText("Uploaded By")).toBeInTheDocument();

        });
    });

});

describe("This suite is to test the Management Level 1", () => {

    describe("Sales", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@head.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });

        test('rendering nav bar', () => {

            const { getByText } = render(<Sales />);

            expect(getByText("Sales")).toBeInTheDocument("Sales")
            expect(getByText("History")).toBeInTheDocument("History")
            expect(getByText("Customers")).toBeInTheDocument("Customers")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<Sales />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });
    });

    describe("History", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@head.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });

        test('rendering nav bar', () => {

            const { getByText } = render(<HeadHistory />);

            expect(getByText("Sales")).toBeInTheDocument("Sales")
            expect(getByText("History")).toBeInTheDocument("History")
            expect(getByText("Customers")).toBeInTheDocument("Customers")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<HeadHistory />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test('history page', async () => {

            render(<HeadHistory />);

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                HeadHistory.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

            await expect(screen.getByText("Vendor Invoice")).toBeInTheDocument();
            await expect(screen.getByText("Payment Requisition")).toBeInTheDocument();
            await expect(screen.getByText("Approval Status")).toBeInTheDocument();
            await expect(screen.getByText("Payment Status")).toBeInTheDocument();
            await expect(screen.getByText("Payment Done At")).toBeInTheDocument();
            await expect(screen.getByText("Uploaded At")).toBeInTheDocument();
            await expect(screen.getByText("Uploaded By")).toBeInTheDocument();

        });
    });

    describe("Customers", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@head.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });

        test('rendering nav bar', () => {

            const { getByText } = render(<HeadContract />);

            expect(getByText("Sales")).toBeInTheDocument("Sales")
            expect(getByText("History")).toBeInTheDocument("History")
            expect(getByText("Customers")).toBeInTheDocument("Customers")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<HeadContract />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

    });

});

describe("This suite is to test the Management Level 2", () => {

    describe("Approve", () => {
        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@management.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });

        test('rendering nav bar', () => {

            const { getByText } = render(<Approve />);

            expect(getByText("Approve")).toBeInTheDocument("Approve")
            expect(getByText("Contract")).toBeInTheDocument("Contract")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<Approve />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test('approve page', async () => {

            render(<Approve />);

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                Approve.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

            await expect(screen.getByText("Vendor Invoice")).toBeInTheDocument();
            await expect(screen.getByText("Payment Requisition")).toBeInTheDocument();
            await expect(screen.getByText("Status")).toBeInTheDocument();
            await expect(screen.getByText("Uploaded At")).toBeInTheDocument();
            await expect(screen.getByText("Uploaded By")).toBeInTheDocument();

        });
    });

    describe("Contract", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@management.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });

        test('rendering nav bar', () => {

            const { getByText } = render(<Contract />);

            expect(getByText("Approve")).toBeInTheDocument("Approve")
            expect(getByText("Contract")).toBeInTheDocument("Contract")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<Contract />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        test('customer page', async () => {

            render(<Contract />);

            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                Contract.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

            await expect(screen.getByText("ADD CUSTOMER")).toBeInTheDocument();

            fireEvent.click(screen.getByText(/ADD CUSTOMER/i))

            let cusNameBox = screen.getByTestId("cusName-text-box");
            let validityBox = screen.getByTestId("validity-text-box");
            let destinationBox = screen.getByTestId("destination-input");
            let containerBox = screen.getByTestId("container-input");
            let freightRateBox = screen.getByTestId("freight-input");
            let effRateBox = screen.getByTestId("eff-input");
            let otherRateBox = screen.getByTestId("other-input");
            let shippingLineBox = screen.getByTestId("shippingLine-input");

            userEvent.type(cusNameBox, "Customer #test");
            userEvent.type(validityBox, "05/24/2023");
            userEvent.type(destinationBox, "BANGKOK");
            userEvent.type(containerBox, "20");
            userEvent.type(freightRateBox, "500");
            userEvent.type(effRateBox, "50");
            userEvent.type(otherRateBox, "10");
            userEvent.type(shippingLineBox, "10");

            //expect(hasInputValue(cusNameBox, "Customer #9")).toBe(true)
            //expect(screen.getByDisplayValue('Customer #9')).toBeInTheDocument();
            //await expect(cusNameBox).toHaveValue("Customer #9");

            fireEvent.click(screen.getByText(/ADD RECORD/i))

        });
    });

});

describe("This suite is to test the Finance", () => {

    describe("Payment", () => {

        beforeEach(() => {
            localStorage.setItem('authToken', 'farmaan@finance.com');
        });

        afterEach(() => {
            localStorage.removeItem('authToken');
        });


        test('rendering nav bar', () => {

            const { getByText } = render(<Payment />);

            expect(getByText("Payment")).toBeInTheDocument("Payment")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<Payment />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

        beforeEach(() => {
            jest.useFakeTimers();
        });
    
        afterEach(() => {
            jest.useRealTimers();
        });

        test('payment page', async () => {


            render(<Payment />);
            expect(screen.getByText('Loading...')).toBeInTheDocument();

            act(() => {
                Payment.setLoadingFalse();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
           
            await expect(screen.getAllByText("Vendor Invoice"));
            await expect(screen.getAllByText("Payment Requisition"));
            await expect(screen.getAllByText("Uploaded At"));
            await expect(screen.getAllByText("Uploaded By"));

            await expect(screen.getByText("Status")).toBeInTheDocument();
            await expect(screen.getByText("Payment Done At")).toBeInTheDocument();

            await expect(screen.getByText("UPDATE RECORDS")).toBeInTheDocument();
            await expect(screen.getByText("Payment Completed")).toBeInTheDocument();

        });

    });

});






/*
describe("firestore customer add", () => {

    beforeEach(() => {
        localStorage.setItem('authToken', 'farmaan@management.com');
        jest.useFakeTimers();
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
        jest.useRealTimers();
    });


    function hasInputValue(inputElement, expectedValue) {
        return inputElement.value === expectedValue;
    }

    test('firestore customer add', async () => {

        const addCustomer = jest.fn();
        //const spy = jest.spyOn(Contract.prototype, 'addcustomer');

        render(<Contract />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        act(() => {
            Contract.setLoadingFalse();
        });

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()

        await expect(screen.getByText("ADD CUSTOMER")).toBeInTheDocument();

        fireEvent.click(screen.getByText(/ADD CUSTOMER/i))

        let customerName = screen.getByTestId("cusName-text-box");
        let validity = screen.getByTestId("validity-text-box");
        let destinationBox = screen.getByTestId("destination-input");
        let containerBox = screen.getByTestId("container-input");
        let freightRateBox = screen.getByTestId("freight-input");
        let effRateBox = screen.getByTestId("eff-input");
        let otherRateBox = screen.getByTestId("other-input");
        let shippingLineBox = screen.getByTestId("shippingLine-input");

        let addRecordButton = screen.getByText(/ADD RECORD/i);

        expect(addRecordButton).toBeDisabled();

        fireEvent.change(customerName, { target: { value: 'Customer #test' } })
        fireEvent.change(validity, { target: { value: '2023-02-17' } })
        fireEvent.change(destinationBox, { target: { value: 'BANGKOK' } })
        fireEvent.change(containerBox, { target: { value: '20' } })
        fireEvent.change(freightRateBox, { target: { value: 500 } })
        fireEvent.change(effRateBox, { target: { value: 50 } })
        fireEvent.change(otherRateBox, { target: { value: 10 } })
        fireEvent.change(shippingLineBox, { target: { value: 'ONE' } })

        expect(hasInputValue(customerName, "Customer #test")).toBe(true)
        //expect(screen.getByDisplayValue('Customer #9')).toBeInTheDocument();
        //await expect(cusNameBox).toHaveValue("Customer #9");

        expect(addRecordButton).toBeEnabled();

        //console.log("addRecordButton is enabled:", addRecordButton.disabled === false);
        fireEvent.click(addRecordButton)
        //console.log("clicked ADD RECORD button");
        
        //await Contract.addCustomer();

        //expect(spy).toHaveBeenCalledWith();

        //spy.mockRestore();
        const totalValue = freightRateBox + effRateBox + otherRateBox;
        const record = [{ containerSize: 'containerBox', destination: 'destinationBox', rate: 'totalValue', shippingLine: 'shippingLineBox' }];

        awaitaddUpdateCustomer('customerName', 'validity', record)
            .then(message => {
                console.log(message)
            })
            .catch(error => console.log(error));

    });
});
*/
/*describe("Test firestore", () => {
    beforeAll(async () => {
        jest.setTimeout(10000);
    });

    test('retrieving data', async () => {


        const auth = getAuth()

        const getDataRefContract = collection(db, "Contract");
        const qry = query(getDataRefContract, where("status", "==", "Approved"), where("paymentStatus", "==", "Pending"));

        const data = await getDocs(qry);
        //setShowData(data.docs.map((doc) => ({ post: doc.data(), id: doc.id })));

    });
});*/



//render(<FirstTest />);
//const element = screen.getByText(/First test/i);
//expect(element).toBeInTheDocument();

//const { getByText } = render(<FirstTest />);
//expect(getByText("First test")).toBeInTheDocument("First test")



