import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'
import '../Login/style.css'


export default function Cadastro() {

  const { cadastrar, loadingAuth } = useContext(AuthContext)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleCadastrar(e){
    e.preventDefault()

    if(!nome || !email || !password){
      alert('Preenchar todos os campos')
      return;
    }

    await cadastrar(nome, email, password)
    setNome('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='container-center'>
        
        <div className='login'>
          <div className='login-area'>
              <img src={require('../../assets/logo.png')} alt='logo'/>
          </div>
          <form onSubmit={handleCadastrar}>
            <h1>Cadastrar</h1>
            <input type='text' placeholder='Digite seu Nome'
            value={nome} onChange={ v => setNome(v.target.value)}/>

            <input type='text' placeholder='Digite seu email'
            value={email} onChange={ v => setEmail(v.target.value)}/>

            <input type='password' placeholder='Digite sua senha' 
            value={password} onChange={ v => setPassword(v.target.value)}/>

            <button type='submit' disabled={loadingAuth}> 
              {loadingAuth ? 
              'Carregando...' : 
              'Cadastrar' }
            </button>
          </form>
          <Link to='/'>Você já possui conta? Faça login</Link>
        </div>

    </div>
  )
}

