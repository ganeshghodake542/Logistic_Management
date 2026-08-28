import React from 'react'
import {Routes, Route} from "react-router-dom"
import AuthProvider from "./contexts/AuthContext"

const App = () => {
  return (
    <div>
      <AuthProvider>
      <Routes>


      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
