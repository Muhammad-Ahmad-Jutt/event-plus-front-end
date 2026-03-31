import { createRoot } from 'react-dom/client'
import React from 'react'
import Homepage from './Homepage'
import "./index.css"
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>
)  