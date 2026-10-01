import React from 'react'
import {useState,useEffect} from 'react'
import Title from './Title'
import Linform from './Linform'
import Logform from './Logform'
import Disform from './Disform'
function App() {
  

  return (
    <div className='mx-5 px-5  ' >
      <Title/>
      <Linform/>
      <Logform/>
      <Disform/>
    </div>
  )
}

export default App
