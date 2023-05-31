import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Private from './Private';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastrar';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
export default function Routers() {
  return (
    <Routes>
        <Route path='/' element={ <Login/> } />
        <Route path='/cadastro' element={ <Cadastro/> } />

        <Route path='/dashboard' element={ <Private> <Dashboard/> </Private> }/>
        <Route path='/profile' element={ <Private> <Profile/> </Private> } />
    </Routes>
  )
}
