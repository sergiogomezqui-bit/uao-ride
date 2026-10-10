import React from 'react'
import { createRoot } from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import App from './App'
import './index.css'

// Habilita la camara de Capacitor en el navegador (PWA)
defineCustomElements(window)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
