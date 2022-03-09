import React, { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { searchHandler, toggleMode } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';
import { Form, Card } from 'react-bootstrap'
import { useMap } from 'react-leaflet';
 
const Dashboard = ({position, station}) => {

  const dispatch = useDispatch()
  const map = useMap()


  const [searchQuery, setSearchQuery] = useState('')

  const isLightMode = useSelector((state) => state.isLightMode)
  const networks = useSelector((state) => state.bikeNetworks.networks)


  const [isActive, setIsActive] = useState(false)
  


  const handleSideBar = () => {
    setIsActive(!isActive)
  }


  return (
        <div className={isActive ? 'dashboard ' : 'dashboard inactive dashboard-dark'}>
           <Switch  onChange={() => {dispatch(toggleMode())}}/>
           <Form>
            <Form.Group className='d-flex align-items-center position-relative flex-column' controlId="formBasicText">
              <Form.Control 
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className='search-input mx-auto mt-3 shadow-none' 
              type="text" 
              placeholder="Search for other cities..." />
              <i class="bi bi-search"></i>
              <Card className='search-result-container mx-auto'>
            {
              networks.filter((network) => {
                if(!searchQuery) return false
                if(network.location.city.toLowerCase().includes(searchQuery.toLowerCase())) return true
              }).map((network) => (
                <Card key={network.id} className='search-result px-0 py-0 my-0' >
                  <Card.Body onClick={() => dispatch(searchHandler(network))}  className='px-2 py-2'>{network.location.city}, {network.location.country}</Card.Body>
                </Card>
              ))
            }
            </Card>
            </Form.Group>
          </Form>
      
          <div onClick={handleSideBar} className='dashboard-arrow-dark dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard