import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastrar';
import Dashboard from '../pages/Dashboard';

export default function Routers() {
  return (
    <Routes>
        <Route path='/' element={ <Login/> } />
        <Route path='/cadastro' element={ <Cadastro/> } />

        <Route path='/dashboard' element={ <Dashboard/> }/>
    </Routes>
  )
}
