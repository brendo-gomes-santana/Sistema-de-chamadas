import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AuthProvider from './contexts/auth'
import Routers from './router'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routers/>
      </AuthProvider>
    </Router>
   
  )
}

