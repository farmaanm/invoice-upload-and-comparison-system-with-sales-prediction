# invoice-upload-and-comparison-system-with-sales-prediction

The Invoice Upload and Comparison System with Future Sales Prediction is an undergraduate level final year project done for an organization identified several drawbacks in the current process followed.

### About the system

Invois: This system is developed to overcome certain drawbacks identified in an organization following a 100% manual process in extracting data and comparing and validating them from two types of invoices. The data validated here are the invoice number, date, customer and shipper address, and the total bill. This process has been automated by extracting data using the `Python Borb` module and `Mindee API`.

As a solution for the identified problem, a web and mobile application with data extraction and validation and a sales prediction is proposed.

The web application is designed to serve four types of users, and their functionalities are listed below.

#### User Level 1

- Upload invoices (Contract / Spot)
- View history of invoices

#### Management Level 2

- Approve / reject User Level 1 uploaded invoices
- Manage Customer records

#### Management Level 1

- View forecasting of sales
- View history of invoices with their payment status
- View list of customers

#### Finance

- View list of approved invoices
- Update payment status

---

### Dependencies

- React

- Firestore

- Google Charts

- Jest

---

### To run the application locally

#### How to run the server

Install dependencies
```
npm install
```

Run the Python server
```
cd backend
```

```
uvicorn main:app --reload
```

Run the application
```
cd invois
```

```
npm start
```

The application can be accessed using http://localhost:3000/.

#### To run test script
```
npm test
```

---

### How it works

#### Basics

The main feature of this system is the PDF data extraction component. Once the invoices are uploaded to the web application, the data extraction is done using `Python Borb` for same structure invoices, and `Mindee API` for different structure of invoices. After the data extraction, comparison is performed. On success, the relevant data is stored in an online Realtime database.

The Sales prediction component is developed with `Python` using the past records of the organization itself. Here, the sales demand of the upcoming 7 months is predicted.

Other CRUD operations are performed within the web application using different database function with Javascript.

