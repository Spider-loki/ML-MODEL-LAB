import React from 'react'
import {useState} from 'react'

function Linform() {
    const [formdata,SetFormdata] = useState({
        Carpet_Area:"",
        Balcony:"",
        Floor_number:"",
        Total_number:"",
        car_parking_space:"",
        car_parking_type_Covered:"",
        car_parking_type_Open:""

    });
    const [showForm,SetShowForm] = useState(false);
    const [predictedPrice,SetPredictedPrice] = useState(null);
    const [mse,Setmse] = useState(null);
    const [rmse,Setrmse] = useState(null);
    const [r2,Setr2] = useState(null);
    const [loading,SetLoading] = useState(false);
    const [image,Setimage] = useState(null);
    const handleChange = (e)=>{
        SetFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        SetLoading(true);
        try{
            const response = await fetch('http://127.0.0.1:8000/api/predict_lin',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Carpet_Area:Number(formdata.Carpet_Area),
                    Balcony:Number(formdata.Balcony),
                    Floor_number:Number(formdata.Floor_number),
                    Total_number:Number(formdata.Total_number),
                    car_parking_space:Number(formdata.car_parking_space),
                    car_parking_type_Covered:Number(formdata.car_parking_type_Covered),
                    car_parking_type_Open:Number(formdata.car_parking_type_Open)
                })
                
            });
            const data = await response.json();
            SetPredictedPrice(data.predicted_price);
            Setmse(data.Mse);
            console.log(data);
            Setimage(data.image);
            Setrmse(data.Rmse);
            Setr2(data.R2);
            SetLoading(false);
        }
        catch(error){
            console.error("Error:",error);
        }
        SetLoading(false);
    };

  return (
    <div>
        
        {!showForm && <button onClick={()=>SetShowForm(true)} className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 my-4 ">House pridiction per square foot</button>
        }
        {showForm &&(
            <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="number" name="Carpet_Area" placeholder="Carpet Area" value={formdata.Carpet_Area} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <input type="number" name="Balcony" placeholder="Balcony" value={formdata.Balcony} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <input type="number" name="Floor_number" placeholder="Floor Number" value={formdata.Floor_number} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <input type="number" name="Total_number" placeholder="Total Number of Floors" value={formdata.Total_number} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <input type="number" name="car_parking_space" placeholder="Car Parking Space" value={formdata.car_parking_space} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <input type="number" name="car_parking_type_Covered" placeholder="Car Parking Type Covered" value={formdata.car_parking_type_Covered} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <input type="number" name="car_parking_type_Open" placeholder="Car Parking Type Open" value={formdata.car_parking_type_Open} onChange={handleChange} required="True" className="border border-gray-300 rounded-md p-2"/>
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Predict Price</button>
        </form>
        {loading && <p>Loading...</p>}
        {predictedPrice !== null && (
        <div className=" font-bold">
            <p className='text-zinc-50 my-4 bg-blue-500 rounded-lg px-4 py-2'>Predicted Price: ₹{predictedPrice} per square foot</p>
            <p className='text-zinc-50 my-4 bg-blue-500 rounded-lg px-4 py-2'>Mean Square Error: {mse} </p>
            <p className='text-zinc-50 my-4 bg-blue-500 rounded-lg px-4 py-2'>R mean square Error: {rmse}</p>
            <p className='text-zinc-50 my-4 bg-blue-500 rounded-lg px-4 py-2'>R2: {r2}</p>
            <img src={`data:image/png;base64,${image}`}
                 alt="Prediction plot" />
        </div>
            )}
        <button onClick={()=>SetShowForm(false)} className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 my-4 ">Close Form</button>
     
     </div>)}
    </div>
  )
}

export default Linform
