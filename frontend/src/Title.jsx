import React from 'react'
import {useState,useEffect} from 'react'

function Title() {
  const [message,setMessage] =useState("")

  const fetchdata = ()=>{
    fetch('http://127.0.0.1:8000/api/hello')
    .then((res)=>res.json())
    .then((data)=>{
      console.log("backend response:", data);
       console.log("Message received:", data.message);
      setMessage(data.message);
    });

  };

  return (
    <div className='mx-5 px-5  ' >
      <h1 className="text-center text-4xl font-bold text-red-500">ML Model Lab</h1>
      <p className='text-center text-lg text-gray-600'>Machine Learning Model Laboratory</p>
      
    </div>
  )
}

export default Title
