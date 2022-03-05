import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
 
function Dashboard({latitude, longitude}) {

  const dispatch = useDispatch()

  const isLightMode = useSelector((state) => state.isLightMode)
  const networks = useSelector((state) => state.bikeNetworks.networks)
  
  
  const allCountries = []
  networks.map((network) => {
    allCountries.push()
  })
  console.log(allCountries)

  const [isActive, setIsActive] = useState(false)
  
  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  return (
        <div className={isActive ? 'dashboard' : 'dashboard inactive'}>
           <Switch  onChange={() => {dispatch(toggleMode())}}/>
           <Autocomplete
               disablePortal
               id="combo-box-demo"
               options={allCountries}
               sx={{ width: '90%', mx: "auto", mt: 2 }}
               renderInput={(params) => <TextField {...params} label="Search for cities" />}
            />
          <div onClick={handleSideBar} className='dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard