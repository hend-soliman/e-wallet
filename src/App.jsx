import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InstaPay from './InstaPay'

export default function App() {
  return (
    <div className='w-full h-dvh bg-gray-900 '>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>}/>
        <Route path='/InstaPay' element={<InstaPay />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
