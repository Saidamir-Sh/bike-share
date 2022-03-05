import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';
 
function Dashboard({latitude, longitude}) {

  const dispatch = useDispatch()

  const isLightMode = useSelector((state) => state.isLightMode)
  const networks = useSelector((state) => state.bikeNetworks.networks)
  
  
  const allCountries = []
  networks.map((network) => {
    allCountries.push(network.location.city)
  })

  const [isActive, setIsActive] = useState(false)
  
  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  return (
        <div className={isActive ? 'dashboard' : 'dashboard inactive'}>
           <Switch  onChange={() => {dispatch(toggleMode())}}/>
      
          <div onClick={handleSideBar} className='dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard