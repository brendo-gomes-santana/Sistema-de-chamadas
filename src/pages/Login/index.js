import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'
import './style.css'


export default function Login() {
  
  const { login } = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleLogin(){
    if(!email || !password){
      alert('preenchar todos os campos')
      return;
    }

    login(email, password)
  }
  return (
    <div className='container-center'>
        
        <div className='login'>
          <div className='login-area'>
              <img src={require('../../assets/logo.png')} alt='logo'/>
          </div>
          <form onSubmit={handleLogin}>
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
