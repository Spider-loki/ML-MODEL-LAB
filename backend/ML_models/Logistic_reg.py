import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

df =pd.read_csv(r"D:\my_projects\ml-model-lab\backend\dataset\Titanic-Dataset.csv")

df = df[['Age','Fare','Survived','Sex','Cabin','Embarked','Parch']]

df['Sex'] = df['Sex'].map({'male':0,'female':1})

df = pd.get_dummies(df,columns=['Embarked'],dtype=int)

df["Cabin"] = df["Cabin"].fillna("Unknown")

df["Deck"] = df["Cabin"].str[0]

df = pd.get_dummies(df, columns=["Deck"], dtype=int)


df = df.drop("Cabin", axis=1)

df['Age'] = df['Age'].fillna(df['Age'].mean())


df['Fare'] = df['Fare'].fillna(df['Fare'].mean())

x = df[['Age', 'Fare', 'Sex', 'Parch',
        'Embarked_C', 'Embarked_Q', 'Embarked_S']]


y = df["Survived"]

log = LogisticRegression()

scaler = StandardScaler()

x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=0.2,random_state=42)

x_train = scaler.fit_transform(x_train)


x_test = scaler.transform(x_test)

log.fit(x_train,y_train)
pred = log.predict(x_test)
def prediction_log(Age, Fare, Sex, Parch,Embarked_C, Embarked_Q, Embarked_S):
    data =[[Age, Fare, Sex, Parch,Embarked_C, Embarked_Q, Embarked_S]]
    
    input_data = pd.DataFrame(data,columns=x.columns)
    input_data = scaler.transform(input_data)
    

    y_pred = log.predict(input_data)
    
    
    return y_pred,accuracy_score(y_test, pred),precision_score(y_test, pred), recall_score(y_test, pred),f1_score(y_test, pred)
