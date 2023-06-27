import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Private from './Private';

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastrar';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import NewClient from '../pages/NewClient';
import New from '../pages/New';
export default function Routers() {
  return (
    <Routes>
        <Route path='/' element={ <Login/> } />
        <Route path='/cadastro' element={ <Cadastro/> } />

        <Route path='/dashboard' element={ <Private> <Dashboard/> </Private> }/>
        <Route path='/profile' element={ <Private> <Profile/> </Private> } />
        <Route path='/customers' element={ <Private> <NewClient/> </Private> }/>
        <Route path='/new' element={ <Private> <New/> </Private> }/>
        
    </Routes>
  )
}
