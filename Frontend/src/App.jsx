import React from 'react'
import { Routes, Route } from "react-router-dom"
import {AuthProvider} from "./contexts/AuthContext"
import AuthPage from './pages/authPage'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>

          {/* <AuthPage />
          <Route></Route> */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/" element={<LandingPage/>} />

        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
