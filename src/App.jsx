import React from 'react'

import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import MyLayout from '@components/MyLayout'

import ROUTES_CONFIG from './router'

const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MyLayout />}>
      {ROUTES_CONFIG.map(routeItem => <Route key={routeItem.key} {...routeItem} />)}
     </Route>
    </Routes>
  )
}

export default App
