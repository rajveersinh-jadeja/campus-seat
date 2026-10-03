import React from 'react'
import Sidebar from './components/sidebar'
import Dashboard from './components/dashboard'

function App() {
  return (
    <div className="flex bg-gray-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <Dashboard />
    </div>
  )
}

export default App