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

    dataset = pd.read_csv('Sales Data.csv')

    dates = dataset["date"].values[591:843]

    dataset = dataset.drop(['date', 'Invoice No.', 'vendor', 'destination', 'LKR per USD', 'Total Value LKR'], axis=1)

    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values
    
    ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
    X = np.array(ct.fit_transform(X))

    X_train = X[:590, :]
    X_test = X[591:843, :]
    y_train = y[0:590]
    y_test = y[591:843]

    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    y_pred = regressor.predict(X_test)
    df = pd.DataFrame({'Real Values': y_test, 'Predicted Values': y_pred, 'Difference': (y_pred/y_test)*100})
    print(df)

    # Counting number of predicted results >80 and <120
    out = np.array([(np.divide(y_pred, y_test))*100])
    result = np.where(np.logical_and(out>= 80, out<= 120))
    print("Values 80 <= result <= 120: ", len(result[1]))

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

    result_values = [dates.tolist(), y_test.tolist(), y_pred.tolist()]

    result_values = []

    for i in range(0, len(y_test)):
        temp_values = []
        temp_values.append(dates[i])
        temp_values.append(y_test[i])
        temp_values.append(y_pred[i])
        
        result_values.append(temp_values)

    return result_values

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

    with open(file_name, "rb") as pdf_in_handle:
        d = PDF.loads(pdf_in_handle, [l0])  # Invoice No.
        d = PDF.loads(pdf_in_handle, [m0])  # Shipper Details
        d = PDF.loads(pdf_in_handle, [n0])  # Invoice Date
        d = PDF.loads(pdf_in_handle, [o0])  # Document Issued By
        d = PDF.loads(pdf_in_handle, [p0])  # Total Value
        d = PDF.loads(pdf_in_handle, [q0])  # Uploaded By

    assert d is not None

    customer = m1.get_text_for_page(0)
    customer = customer.replace('\n', ' ')

    doc_issued_by = o1.get_text_for_page(0)
    doc_issued_by = doc_issued_by.replace('\n', ' ')

    # b'{"Machine Name":"'+hostname+'"}', None, True)

    str = '{"invoice_no":"' + l1.get_text_for_page(0) + '","customer_details":"' + customer + '","invoice_date":"' + n1.get_text_for_page(
        0) + '","document_issued_by":"' + doc_issued_by + '","total_value":"' + p1.get_text_for_page(0) + '","uploaded_by":"' + q1.get_text_for_page(0) + '"}'

    #json_str = json.loads(str)

    return str


if __name__ == '__main__':
    app.run()

#http://127.0.0.1:8000/my-first-api
#http://127.0.0.1:8000/my-second-api?name=Farmaan
#uvicorn main:app --reload




