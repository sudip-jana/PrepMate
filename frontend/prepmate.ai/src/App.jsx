import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Login from './pages/Auth/Login'
import Signup from './pages/Auth/SignUp'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Home/Dashboard'
import PrepMate from './pages/PrepMate/PrepMate'
import UserProvider from './Context/userContext'

function App() {

  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prep/:id" element={<PrepMate />} />
          </Routes>
          
          <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }} />

        </Router>

      </div>
    </UserProvider>
  )
}

export default App
