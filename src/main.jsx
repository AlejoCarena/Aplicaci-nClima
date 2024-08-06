import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/WeatherStyles.css'
import { WeatherApp } from './WheatherApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherApp/>
  </React.StrictMode>,
)
