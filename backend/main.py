from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ML_models.Linear_reg import prediction_lin
from ML_models.Logistic_reg import prediction_log
from pydantic import BaseModel
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",  # Create React App default port
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HouseInput(BaseModel):
    Carpet_Area: float
    Balcony: int
    Floor_number: int
    Total_number: int
    car_parking_space: int
    car_parking_type_Covered: int
    car_parking_type_Open: int
class LiveOrDead(BaseModel):
    Age:int
    Fare:float
    Sex:int
    Parch:int
    Embarked_c:int
    Embarked_Q:int
    Embarked_S:int

@app.get("/api/hello")
def read_root():
    return {
        "message": "Welcome to ML Model Lab API!"
    }


@app.post("/api/predict_log")
def make_prediction_log(data: LiveOrDead):

    prediction_result,accuracy,precision,recall_score,f1_score = prediction_log(
        data.Age,
        data.Fare,
        data.Sex,
        data.Parch,
        data.Embarked_c,
        data.Embarked_Q,
        data.Embarked_S
    )
    
    return {
        "Survived_or_not":"survived" if prediction_result else "Not survived" ,
        "Accuracy":float(accuracy),
        "Precision":float(precision),
        "Recall_score":float(recall_score),
        "f1_score":float(f1_score)
    }

@app.post("/api/predict_lin")
def make_prediction_lin(data: HouseInput):

    prediction_result,mse,rmse,r2,image_base64 = prediction_lin(
        data.Carpet_Area,
        data.Balcony,
        data.Floor_number,
        data.Total_number,
        data.car_parking_space,
        data.car_parking_type_Covered,
        data.car_parking_type_Open
    )
    
    return {
        "predicted_price": int(prediction_result),
        "Mse":float(mse),
        "Rmse":float(rmse),
        "R2":float(r2),
        "image":image_base64
    }