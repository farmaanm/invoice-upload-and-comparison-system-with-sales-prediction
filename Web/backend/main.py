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

if __name__ == '__main__':
    app.run()

#http://127.0.0.1:8000/my-first-api
#http://127.0.0.1:8000/my-second-api?name=Farmaan
#uvicorn main:app --reload




