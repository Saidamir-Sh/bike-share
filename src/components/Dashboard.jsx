import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';
import { Form } from 'react-bootstrap'
 
const Dashboard = ({station}) => {

  const dispatch = useDispatch()

  const isLightMode = useSelector((state) => state.isLightMode)
  //console.log(station)

  const [isActive, setIsActive] = useState(false)
  
  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  return (
        <div className={isActive ? 'dashboard ' : 'dashboard inactive dashboard-dark'}>
           <Switch  onChange={() => {dispatch(toggleMode())}}/>
           <Form>
            <Form.Group controlId="formBasicText">
              <Form.Control className='search-input mx-auto mt-3' type="text" placeholder="Search for other cities..." />
            </Form.Group>
          </Form>
      
          <div onClick={handleSideBar} className='dashboard-arrow-dark dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard