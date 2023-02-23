from sklearn.metrics import r2_score
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

dataset = pd.read_csv('Sales Data.csv')

dataset = dataset.drop(['date', 'Invoice No.', 'vendor', 'destination', 'LKR per USD', 'Total Value LKR'], axis=1)

#dataset = dataset.drop(['type', 'size', 'quantity', 'USD per qty'], axis=1)

# date, day, month, year, Invoice No., type, vendor, size, quantity, destination, LKR per USD, USD per qty, Total Value USD, Total Value LKR
# day, month, year, type, size, quantity, USD per qty, Total Value USD

#dataset['vendor'].replace(['CMACGM', 'COSCO', 'DELMEGE', 'KMTC', 'MCLARENS', 'MSC', 'ONE', 'OOCL'], [1, 2, 3, 4, 5, 6, 7, 8], inplace=True)

#print(dataset)

X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
#print(X)
#print(y)


ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
X = np.array(ct.fit_transform(X))

#print('X')
#with np.printoptions(threshold=np.inf):
#    print(X)


#X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)  # 30% for testing

X_train = X[:590, :]
X_test = X[591:843, :]
y_train = y[0:590]
y_test = y[591:843]


regressor = LinearRegression()
regressor.fit(X_train, y_train)


y_pred = regressor.predict(X_test)
df = pd.DataFrame({'Real Values': y_test, 'Predicted Values': y_pred, 'Difference': (y_pred/y_test)*100})
print(df)
#print(y_test)
#print(y_pred)
#print(df.to_string())

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

#################################################################
future_data = X_train
y_pred2 = regressor.predict(future_data)
#print(type(y_pred)) numpy.ndarray
#print(y_pred2)

y = np.append(y_pred, y_pred2)
#################################################################

plt.figure(figsize=(15, 7))
plt.plot(y_test)
plt.plot(y)
plt.title("Sales Forecast using Multiple Linear")
plt.xlabel("Index")
plt.ylabel("Sales")
plt.legend(["Original Sales", "Predicted Sales"])
plt.show()

