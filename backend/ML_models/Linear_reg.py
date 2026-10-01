import pandas as pd
import numpy as np
import base64
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score


# ==============================
# 2. Load dataset
# ==============================

df = pd.read_csv(
    r"D:\my_projects\ml-model-lab\backend\dataset\house_prices.csv",
    on_bad_lines="skip",
    engine="python"
)



# ==============================
# 3. Remove unnecessary columns
# ==============================

df = df.drop(
    columns=[
        "Title",
        "Description",
        "Status",
        "Transaction",
        "Furnishing",
        "facing",
        "overlooking",
        "Society",
        "Ownership",
        "Super Area",
        "Bathroom",
        "Index",
        "Amount(in rupees)",
        "Dimensions",
        "Plot Area",
        "location"
    ],
    errors="ignore"
)


# ==============================
# 4. Convert Carpet Area to number
# ==============================

df["Carpet Area"] = (
    df["Carpet Area"]
    .str.extract(r"(\d+\.?\d*)")
    .astype(float)
)


# ==============================
# 5. Extract floor information
# ==============================

df["Floor_number"] = (
    df["Floor"]
    .str.extract(r"(\d+)")
    .astype(float)
)

df["Total_number"] = (
    df["Floor"]
    .str.extract(r"out of (\d+)")
    .astype(float)
)


# ==============================
# 6. Handle Balcony
# ==============================

df['Balcony'] = df['Balcony'].astype(str).str.extract(r'(\d+\.?\d*)').astype(float).fillna(0)


# ==============================
# 7. Process Car Parking
# ==============================

df["car_parking_space"] = (
    df["Car Parking"]
    .str.extract(r"(\d+)")
    .astype(float)
)

df["car_parking_space"] = (
    df["car_parking_space"]
    .fillna(0)
)

df["car_parking_type"] = (
    df["Car Parking"]
    .str.extract(r"(Open|Covered)")
)

df = pd.get_dummies(
    df,
    columns=["car_parking_type"],
    dtype=int
)


# ==============================
# 8. Handle missing Carpet Area
# ==============================

df["Carpet Area"] = df["Carpet Area"].fillna(0)


# ==============================
# 9. Remove original text columns
# ==============================

df = df.drop(
    columns=["Floor", "Car Parking"],
    errors="ignore"
)


# ==============================
# 10. Remove rows with missing target
# ==============================

df = df.dropna(
    subset=["Price (in rupees)"]
)


# ==============================
# 11. Remove rows with missing floor data
# ==============================

df = df.dropna(
    subset=["Floor_number", "Total_number"]
)





# ==============================
# 12. Use smaller dataset
#    (prevents RAM crash while learning)
# ==============================

df = df.sample(
    n=min(30000, len(df)),
    random_state=42
)


# ==============================
# 13. Separate X and y
# ==============================

X = df.drop(
    "Price (in rupees)",
    axis=1
)

y = df["Price (in rupees)"]



# ==============================
# 14. Train-test split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# ==============================
# 15. Scale features
# ==============================



# ==============================
# 16. Create Linear Regression model
# ==============================

model = LinearRegression()


# ==============================
# 17. Train model
# ==============================

model.fit(
    X_train,
    y_train
)


# ==============================
# 18. Make predictions
# ==============================

def prediction_lin(
    Carpet_Area,
    Balcony,
    Floor_number,
    Total_number,
    car_parking_space,
    car_parking_type_Covered,
    car_parking_type_Open,
):

    data=[[Carpet_Area, Balcony, Floor_number, Total_number, car_parking_space, car_parking_type_Covered, car_parking_type_Open]]
    input_data = pd.DataFrame(data, columns=X.columns)
    y_pred = model.predict(input_data)
    pred=model.predict(X_test)
    mse = mean_squared_error(
            y_test,
            pred
        )

    rmse = np.sqrt(mse)

    r2 = r2_score(
            y_test,
            pred
        )
    #print(y_pred[0],mse,rmse,r2)
    # ==============================
    # 19. Evaluate model
    # ==============================
    plt.figure(figsize=(8,5))
    plt.scatter(y_test,pred)
    plt.plot(
        [y_test.min(),y_test.max()],
        [y_test.min(),y_test.max()]
    )
    plt.xlabel("Actual Price")
    plt.ylabel("Predicted Price")
    plt.title("Actual vs Predicted House Price")

    plt.savefig(r"D:\my_projects\ml-model-lab\backend\ML_models\images\prediction_plot.png")
    plt.close()
    with open(r"D:\my_projects\ml-model-lab\backend\ML_models\images\prediction_plot.png","rb") as image_file:
        image_base64 = base64.b64encode(image_file.read()).decode("utf-8")
    
    return y_pred[0],mse,rmse,r2,image_base64

   
