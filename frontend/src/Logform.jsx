import React from 'react'

import { useState } from 'react'

function Logform() {
    const [showForm,SetshowForm] = useState(false);
    const [predict,Setpredict] = useState(null);
    const [form,Setform] = useState({
        Age:"",
        Fare:"",
        Sex:"",
        Parch:"",
        Embarked_c:"",
        Embarked_Q:"",
        Embarked_S:""
    })
    const [accuracy,Setaccuracy] = useState(0);
    const [precision,Setprecision] = useState(0);
    const [recall,Setrecall] = useState(0);
    const [f1_score,Setf1_score] = useState(0);
    const [loading,Setloading] = useState(false);
    const handlechange = (e)=>{
        Setform({
             ...form,
             [e.target.name]:e.target.value
        }
           
        );
    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        Setloading(true);
        try{
            const response = await fetch("http://127.0.0.1:8000/api/predict_log",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'

                },
                body:JSON.stringify({
                    Age:Number(form.Age),
                    Fare:Number(form.Fare),
                    Sex:Number(form.Sex),
                    Parch:Number(form.Parch),
                    Embarked_c:Number(form.Embarked_c),
                    Embarked_Q:Number(form.Embarked_Q),
                    Embarked_S:Number(form.Embarked_S)
                    
                })
            });
            const data = await response.json();
            Setpredict(data.Survived_or_not);
            Setaccuracy(data.Accuracy);
            Setprecision(data.Precision);
            Setrecall(data.Recall_score);
            Setf1_score(data.f1_score);
            Setloading(false);
        }
        catch(error){
            console.log("Error:",error);
        }
    }

  return (
    <div>
        {!showForm &&<button onClick={()=>SetshowForm(true)} className="text-white text-bold bg-blue-500 hover:bg-blue-700 rounded-lg p-4 my-4">Live or Dead in Titanic</button>}
        {showForm && 
        (<div>
            <h1 className="text-red-500 text-bold hover:text-blue-500 text-2xl">Give Data to Predict wheather Live or not in Titanic ship</h1>
            <form onSubmit={handlesubmit} className="flex flex-col gap-4">
                <input type="number" name="Age" placeholder="Age" onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
                <input type="number" name="Fare" placeholder="Fare" required="True" onChange={handlechange} className="border border-gray-300 rounded-md p-2" />
                <input type="number" name="Sex" placeholder="Sex" required="True" onChange={handlechange} className="border border-gray-300 rounded-md p-2" />
                <input type="number" name="Parch" placeholder="Parch" required="True" onChange={handlechange} className="border border-gray-300 rounded-md p-2" />
                <input type="number" name="Embarked_c" placeholder="Embarked (C)" required="True" onChange={handlechange} className="border border-gray-300 rounded-md p-2" />
                <input type="number" name="Embarked_Q" placeholder="Embarked (Q)" required="True" onChange={handlechange} className="border border-gray-300 rounded-md p-2" />
                <input type="number" name="Embarked_S" placeholder="Embarked (S)" required="True" onChange={handlechange} className="border border-gray-300 rounded-md p-2" />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Predict</button>
            </form>
            {loading && <p>Loading...</p>}
            
            
            {predict !== null && (
            <div className=" font-bold">
                <p className="text-zinc-50 bg-blue-500 px-4 py-2 my-2 rounded-lg">{predict}</p>
                <p className="text-zinc-50 bg-blue-500 px-4 py-2 my-2 rounded-lg">{accuracy}</p>
                <p className="text-zinc-50 bg-blue-500 px-4 py-2 my-2 rounded-lg">{precision}</p>
                <p className="text-zinc-50 bg-blue-500 px-4 py-2 my-2 rounded-lg">{recall}</p>
                <p className="text-zinc-50 bg-blue-500 px-4 py-2 my-2 rounded-lg">{f1_score}</p>
            </div>
        )}
            <button onClick={()=>SetshowForm(false)} className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 my-4 ">Close form</button>
        </div>)}
        
    </div>
  )
}

export default Logform
