import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InstaPay from './InstaPay'
import Login from './Login'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className='w-full h-dvh bg-gray-900 '>
      <Toaster position="bottom-center"/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/InstaPay' element={<InstaPay />}/>
        <Route path='/Login' element={<Login />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
