import React from 'react'
import { useState } from 'react'
function Disform() {
    const [showform,Setshowform] = useState(false);
    const [formdata,Setformdata] = useState({
        Carpet_Area:"",
        Balcony:"",
        Floor_number:"",
        Total_number:"",
        car_parking_space:"",
        car_parking_type_covered:"",
        car_parking_type_open:""
        
    });
    const [loading,Setloading] = useState(false);
    const [predict,Setpredict] = useState(null);
    const handlechange =(e)=>{
        Setformdata({
            ...formdata,
            [e.target.name]:e.target.value
        });
    }
    const handlesubmit =async(e)=>{
        e.preventdefault();
        Setloading(true);
        try{
            const response =await fetch("http://127.0.0.1:8000/api/predict",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(
                    {
                        Carpet_Area:Number(formdata.Carpet_Area),
                        Balcony:Number(formdata.Balcony),
                        Floor_number:Number(formdata.Floor_number),
                        Total_number:Number(formdata.Total_number),
                        car_parking_space:Number(formdata.car_parking_space),
                        car_parking_type_covered:Number(formdata.car_parking_type_covered),
                        car_parking_type_open:Number(formdata.car_parking_type_open)
                    }
                )
            });
            const data = await response.json();
            Setpredict(data.predicted_price);
            Setloading(false)
        }
        catch(error){
            console.log("Error:",error);
        }
        Setloading(false);
    }

  return (
    

    <div>
       
        {!showform && <button onClick={()=>Setshowform(true)} className="bg-blue-500 text-white my-4 p-4 hover:bg-red-500 rounded-lg">show form</button>
    }
    {showform &&(
        <div>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4">
            <input type="number" name='Carpet_Area' placeholder='Sqrt Foot' value={formdata.Carpet_Area} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <input type="number" name='Balcony' placeholder='Balcony' value={formdata.Balcony} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <input type="number" name='Floor_number' placeholder='Floor_number' value={formdata.Floor_number} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <input type="number" name='Total_number' placeholder='Total_number' value={formdata.Total_number} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <input type="number" name='car_parking_space' placeholder='car_parking_space' value={formdata.car_parking_space} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <input type="number" name='car_parking_type_covered' placeholder='car_parking_type_Covered' value={formdata.car_parking_type_covered} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <input type="number" name='car_parking_type_Open' placeholder='car_parking_type_Open' value={formdata.car_parking_type_open} onChange={handlechange} required="True" className="border border-gray-300 rounded-md p-2" />
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Predict Price</button>
        </form>
        {loading && <p>Loading...</p>}
        {predict !==null &&(
            <p className="text-green-500 font-bold">
                Predicted price:Rs {predict} per square foot
            </p>
        )}
        <button onClick={()=>Setshowform(false)} className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 my-4 ">Close Form</button>
        </div>
    )}
    </div>
  )
}

export default Disform
