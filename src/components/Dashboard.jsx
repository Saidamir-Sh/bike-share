import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function Dashboard({latitude, longitude}) {

  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
  }
  console.log(isActive)

  return (
        <div className={isActive ? 'dashboard' : 'dashboard inactive'}>

          <div onClick={handleToggle} className='dashboard-arrow d-flex align-items-center justify-content-center'>
            <ArrowRightIcon />
          </div>
        </div>
  )
}

export default Dashboard