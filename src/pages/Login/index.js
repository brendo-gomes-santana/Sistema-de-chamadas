import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './style.css'


export default function Login() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div className='container-center'>
        
        <div className='login'>
          <div className='login-area'>
              <img src={require('../../assets/logo.png')} alt='logo'/>
          </div>
          <form>
            <h1>Entrar</h1>
            
            <input type='text' placeholder='Digite seu email'
            value={email} onChange={ v => setEmail(v.target.value)}/>

            <input type='password' placeholder='Digite sua senha' 
            value={password} onChange={ v => setPassword(v.target.value)}/>

            <button type='submit'> Entrar </button>
          </form>
          <Link to='/cadastro'>Você não possui senha? Registar agora</Link>
        </div>

    </div>
  )
}
