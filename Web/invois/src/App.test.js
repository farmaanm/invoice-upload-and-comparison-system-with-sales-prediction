import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved, waitFor, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';

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
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from './firebase'



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

describe("This suite is to test the Management Level 1", () => {

    describe("Sales", () => {
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
    });

    describe("Customers", () => {

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

    describe("Contract", () => {
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

    });

});

describe("This suite is to test the Finance", () => {

    describe("Payment", () => {

        test('rendering nav bar', () => {

            const { getByText } = render(<Payment />);

            expect(getByText("Payment")).toBeInTheDocument("Payment")
            expect(getByText("Log out")).toBeInTheDocument("Log out")

        });

        test('rendering loading screen', () => {

            const { getByText } = render(<Payment />);

            expect(getByText("Loading...")).toBeInTheDocument("Loading...")

        });

    });

});


