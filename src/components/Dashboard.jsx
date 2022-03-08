import React, { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';
import { Form } from 'react-bootstrap'
 
const Dashboard = ({station}) => {

  const dispatch = useDispatch()


  const [searchQuery, setSearchQuery] = useState('')

  const isLightMode = useSelector((state) => state.isLightMode)
  const networks = useSelector((state) => state.bikeNetworks.networks)
  console.log(networks)


  const [isActive, setIsActive] = useState(false)
  
  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  return (
        <div className={isActive ? 'dashboard ' : 'dashboard inactive dashboard-dark'}>
           <Switch  onChange={() => {dispatch(toggleMode())}}/>
           <Form>
            <Form.Group className='d-flex align-items-center position-relative' controlId="formBasicText">
              <Form.Control 
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className='search-input mx-auto mt-3 shadow-none' 
              type="text" 
              placeholder="Search for other cities..." />
              <i class="bi bi-search"></i>
            </Form.Group>
            {
              networks.filter((network) => {
                if(!searchQuery) return false
                if(network.location.city.toLowerCase().includes(searchQuery)) return true
              }).map((network) => (
                <div>
                  <p>{network.location.city}</p>
                </div>
              ))
            }
          </Form>
      
          <div onClick={handleSideBar} className='dashboard-arrow-dark dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard