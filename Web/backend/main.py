from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/salesprediction")
def multiple_regression():
    from sklearn.metrics import r2_score
    from sklearn.linear_model import LinearRegression
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import OneHotEncoder
    from sklearn.compose import ColumnTransformer
    import numpy as np
    import matplotlib.pyplot as plt
    import pandas as pd

    # read csv file
    dataset = pd.read_csv('Sales Data.csv')

    # dropping unwanted columns
    dataset = dataset.drop(['date', 'Invoice No.', 'vendor', 'destination', 'LKR per USD', 'Total Value LKR'], axis=1)

    # seperating input variables and output variables
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    # transforming string values to number values
    ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
    X = np.array(ct.fit_transform(X))

    # using all records to train model
    X_train = X[:, :]    #[:590, :] [rows, cols]
    y_train = y[:]  #[0:590]

    # using 252 records to actually predict
    X_test = X[591:843, :]
    y_test = y[591:843]

    # training the model
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    # predicting sales
    y_pred = regressor.predict(X_test)
    df = pd.DataFrame({'Real Values': y_test, 'Predicted Values': y_pred, 'Difference': (y_pred/y_test)*100})

    # reporting accuracy
    from sklearn.metrics import mean_absolute_error, mean_squared_error
    linreg_rmse = np.sqrt(mean_squared_error(y_pred, y_test))
    linreg_mae = mean_absolute_error(y_pred, y_test)
    print('Linear Regression RMSE: ', linreg_rmse)
    print('Linear Regression MAE: ', linreg_mae)

    # Check the accuracy
    Accuracy = r2_score(y_test, y_pred)*100
    print("Accuracy of the model is %.2f" % Accuracy)

    '''
    plt.figure(figsize=(15, 7))
    plt.plot(y_test)
    plt.plot(y_pred)
    plt.title("Sales Forecast using Multiple Linear")
    plt.xlabel("Index")
    plt.ylabel("Sales")
    plt.legend(["Original Sales", "Predicted Sales"])
    plt.show()
    '''

    #################################################################

    from datetime import datetime, timedelta

    # getting todays date
    dt = datetime.now()

    future_data = []    #X_test
    month_array = []

    for i in range(0, 300):

        td = timedelta(days=i+1)
        my_date = dt + td

        my_date = datetime.strptime(str(my_date)[:10], '%Y-%m-%d')

        #print(my_date)
        
        year = int(str(my_date)[:4])
        month = int(str(my_date)[5:7])
        day = int(str(my_date)[8:10])

        selected_rows = X[(X[:, 2] == day) & (X[:, 3] == month)]
        if selected_rows != []:
            for j in selected_rows:
                temp_future_data = []
                for p in range(0, len(j)):
                    temp_future_data.append(j[p])
                    if p == 4:
                        temp_future_data[4] = year
                future_data.append(temp_future_data)
        
        month_array.append(month)

        # replacing the date, month, year column with new date values
        #future_data[i][2] = day
        #future_data[i][3] = month
        #future_data[i][4] = year

    # predicting sales with new dates
    y_pred2 = regressor.predict(future_data)

    #################################################################

    result_values = []

    for i in range(0, 300):
        temp_values = []
        temp_values.append(month_array[i])
        #temp_values.append(y_test[i])
        temp_values.append(y_pred2[i])

        # appending the month and prediction result as an array to another array
        result_values.append(temp_values)

    # grouping the result by month and adding prediction result for the relevant month
    from itertools import groupby
    groups = groupby(result_values, key=lambda v:v[0])
    result = [[i, sum(v[1] for v in g)] for i, g in groups]
    #print(result)

    '''
    import calendar
    for x in range(0,len(result)):
        #print(result[x][0])
    
        #print(calendar.month_name[result[x][0]])
    
        result[x][0] = calendar.month_name[result[x][0]]
    '''
    
    return result


@app.get("/extractPayReq")
def paymentRequisition(pdfname=None):

    print(pdfname)
    print(type(pdfname))

    import typing
    import json
    from decimal import Decimal

    from borb.pdf import Document
    from borb.pdf.pdf import PDF
    from borb.toolkit.text.simple_text_extraction import SimpleTextExtraction

    from borb.toolkit.location.location_filter import LocationFilter
    from borb.pdf.canvas.geometry.rectangle import Rectangle

    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/3. Data comparing/Python Borb/Cost Confirmation Document - SCMB0006015.pdf"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/3. Data comparing/Python Borb/Cost Confirmation Document - SCMB0006024.pdf"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/3. Data comparing/Python Borb/Cost Confirmation Document - SCMB0006026.pdf"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/1. Invoices/Payment Requisition/Cost Confirmation Document - SCMB0006060.PDF"
    #file_name = "D:/OneDrive - University of Plymouth/Y3/S1/Projects/1. PUSL3119 Project/0. Material/1. Invoices/8/Cost Confirmation Document - SCMB0006095.PDF"
    #file_name = "file.pdf"
    #file_name = "payment requisition/Cost Confirmation Document - SCMB0006089.PDF"
    file_name = "payment requisition/" + pdfname

    d: typing.Optional[Document] = None

    # Define rectangle of interest
    # x, y, width, height
    # Invoice No.
    r: Rectangle = Rectangle(Decimal(300),
                             Decimal(660),
                             Decimal(160),
                             Decimal(100))

    # Shipper Details
    r1: Rectangle = Rectangle(Decimal(30),
                              Decimal(590),
                              Decimal(300),
                              Decimal(80))

    # Invoice Date
    r2: Rectangle = Rectangle(Decimal(450),
                              Decimal(570),
                              Decimal(300),
                              Decimal(50))

    # Document Issued By
    r3: Rectangle = Rectangle(Decimal(30),
                              Decimal(40),
                              Decimal(300),
                              Decimal(80))

    # Total Value
    r4: Rectangle = Rectangle(Decimal(450),
                              Decimal(60),
                              Decimal(300),
                              Decimal(40))

    # Uploaded By
    r5: Rectangle = Rectangle(Decimal(390),
                              Decimal(40),
                              Decimal(300),
                              Decimal(20))

    # Set up EventListener(s)
    # Invoice No.
    l0: LocationFilter = LocationFilter(r)
    l1: SimpleTextExtraction = SimpleTextExtraction()
    l0.add_listener(l1)

    # Shipper Details
    m0: LocationFilter = LocationFilter(r1)
    m1: SimpleTextExtraction = SimpleTextExtraction()
    m0.add_listener(m1)

    # Invoice Date
    n0: LocationFilter = LocationFilter(r2)
    n1: SimpleTextExtraction = SimpleTextExtraction()
    n0.add_listener(n1)

    # Document Issued By
    o0: LocationFilter = LocationFilter(r3)
    o1: SimpleTextExtraction = SimpleTextExtraction()
    o0.add_listener(o1)

    # Total Value
    p0: LocationFilter = LocationFilter(r4)
    p1: SimpleTextExtraction = SimpleTextExtraction()
    p0.add_listener(p1)

    # Uploaded By
    q0: LocationFilter = LocationFilter(r5)
    q1: SimpleTextExtraction = SimpleTextExtraction()
    q0.add_listener(q1)

    if "Cost Confirmation Document" not in file_name:
        return "File format not supported"
    

    with open(file_name, "rb") as pdf_in_handle:
        d = PDF.loads(pdf_in_handle, [l0])  # Invoice No.
        d = PDF.loads(pdf_in_handle, [m0])  # Shipper Details
        d = PDF.loads(pdf_in_handle, [n0])  # Invoice Date
        d = PDF.loads(pdf_in_handle, [o0])  # Document Issued By
        d = PDF.loads(pdf_in_handle, [p0])  # Total Value
        d = PDF.loads(pdf_in_handle, [q0])  # Uploaded By

    assert d is not None

    total_value = p1.get_text_for_page(0)
    if (('\n' in total_value) == True):
        total_value = total_value.split('\n', 1)[0]

    customer = m1.get_text_for_page(0)
    customer = customer.replace('\n', ' ')

    doc_issued_by = o1.get_text_for_page(0)
    doc_issued_by = doc_issued_by.replace('\n', ' ')

    # b'{"Machine Name":"'+hostname+'"}', None, True)

    str = '{"invoice_no":"' + l1.get_text_for_page(0) + '","customer_details":"' + customer + '","invoice_date":"' + n1.get_text_for_page(
        0) + '","document_issued_by":"' + doc_issued_by + '","total_value":"' + total_value + '","uploaded_by":"' + q1.get_text_for_page(0) + '"}'

    #json_str = json.loads(str)

    return str

    
@app.get("/validateData")
def dataComparison(cusInvStr=None, payReqStr=None):

    print(cusInvStr)
    print(payReqStr)
    
    if cusInvStr is None and payReqStr is None:
        result = "Empty"
    else:

        import json

        #for key, value in cusInvStr.items():
        #    print(key, value)
        
        cusInvJson = json.loads(cusInvStr)
        payReqJson = json.loads(payReqStr)

        print(cusInvJson)
        print(type(cusInvJson))

        print(payReqJson["invoice_no"])
        
        cusInv_invoice_number = cusInvJson["invoice_no"]
        cusInv_invoice_date = cusInvJson["invoice_date"]
        cusInv_customer_address = cusInvJson["document_issued_by"]
        cusInv_shipper_address = cusInvJson["customer_details"]
        cusInv_total_value = cusInvJson["total_value"]

        payReq_invoice_number = payReqJson["invoice_no"]
        payReq_invoice_date = payReqJson["invoice_date"]
        payReq_customer_address = payReqJson["customer_details"]
        payReq_shipper_address = payReqJson["document_issued_by"]
        payReq_total_value = payReqJson["total_value"]
        
        payReq_total_value = payReq_total_value.replace(",", "")

        print(type(cusInv_total_value))
        print(type(payReq_total_value))
        
        # Date
        from dateutil import parser

        cusInv_invoice_date = parser.parse(cusInv_invoice_date)
        payReq_invoice_date = parser.parse(payReq_invoice_date)
        
        print('Date -> ', cusInv_invoice_date == payReq_invoice_date)
        
        # invoice number
        print('Invoice No. -> ', cusInv_invoice_number == payReq_invoice_number)

        # Total value
        print('Bill Value -> ', cusInv_total_value == payReq_total_value)

        # Customer Address
        cusInv_customer_address = set(cusInv_customer_address.lower().split())
        payReq_customer_address = set(payReq_customer_address.lower().split())
        customer_address = cusInv_customer_address & payReq_customer_address
        
        print(customer_address)

        # Shipper Address
        cusInv_shipper_address = set(cusInv_shipper_address.lower().split())
        payReq_shipper_address = set(payReq_shipper_address.lower().split())
        shipper_address = cusInv_shipper_address & payReq_shipper_address

        print(shipper_address)
    
        if((cusInv_invoice_date == payReq_invoice_date) and (cusInv_invoice_number == payReq_invoice_number) and (cusInv_total_value == payReq_total_value) and len(shipper_address) >= 2 and len(customer_address) >= 2):
            result = "True"
        else:
            ans = ["Invoice Date: " + str(cusInv_invoice_date == payReq_invoice_date) , "Invoice No.: " + str(cusInv_invoice_number == payReq_invoice_number) , "Total Value: " + str(cusInv_total_value == payReq_total_value)]
            stringVal = 'True'

            result = f"{[ x for x in ans if stringVal not in x ]}"
            result = str(result).replace('[','').replace("]","").replace("'","")

        return result
   


if __name__ == '__main__':
    app.run()

# http://127.0.0.1:8000/my-first-api
# http://127.0.0.1:8000/my-second-api?name=Farmaan
# http://127.0.0.1:8000/my-second-api?name=Farmaan&name2=A
# uvicorn main:app --reload