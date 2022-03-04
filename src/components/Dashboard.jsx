import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';

function Dashboard({latitude, longitude}) {

  const [isActive, setIsActive] = useState(false)
  const [isLightMode, setIsLightMode] = useState(true)

  const toggleMode = () => {
    setIsLightMode(!isLightMode)
  }

  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  return (
        <div className={isActive ? 'dashboard' : 'dashboard inactive'}>
           <Switch  onChange={toggleMode}/>

          <div onClick={handleSideBar} className='dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard