import React, { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { searchHandler, setUserLatLng, toggleMode } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Switch } from '@mui/material';
import { Form, Card, Button } from 'react-bootstrap'
import { useMap } from 'react-leaflet';
 
const Dashboard = () => {

  const dispatch = useDispatch()
  const map = useMap()

  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const isLightMode = useSelector((state) => state.isLightMode)
  const networks = useSelector((state) => state.bikeNetworks.networks)
  const userLat = useSelector((state) => state.userPosition.latitude)
  const userLng = useSelector((state) => state.userPosition.longitude)
  const userPosition = [userLat, userLng]
  

  // collapse side bar
  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  // prevent page refreshing
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // event handler for search result
  const handleClickOnResult = (network) => {
    dispatch(searchHandler(network)); 
    setShowResults(!showResults);
    setSearchQuery(network.location.city)
  }

  // search input onChange event
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    setShowResults(!showResults)
  }


  return (
        <div className={isActive ? 'dashboard ' : 'dashboard inactive dashboard-dark'}>

           <Switch  onChange={() => {dispatch(toggleMode())}}/>

           <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='d-flex align-items-center position-relative flex-column' controlId="formBasicText">
              <Form.Control 
              onChange={(e) => handleInputChange(e)}
              value={searchQuery}
              className='search-input mx-auto mt-3 shadow-none' 
              type="text" 
              placeholder="Search for other cities..." />
              <i class="bi bi-search"></i>
              <Card className={showResults ? 'search-result-container mx-auto ' : 'search-result-container mx-auto d-none'}>
            {
              networks.filter((network) => {
                if(!searchQuery) return false
                if(network.location.city.toLowerCase().includes(searchQuery.toLowerCase())) return true
              }).map((network) => (
                <Card key={network.id} className='search-result px-0 py-0 my-0' >
                  <Card.Body onClick={() => {handleClickOnResult(network)}}  className='px-2 py-2'>{network.location.city}, {network.location.country}</Card.Body>
                </Card>
              ))
            }
            </Card>
            </Form.Group>

            <Button variant="primary" onClick={() => map.flyTo(userPosition)} className='location-btn py-2'>Current location</Button>
          </Form>
      
          <div onClick={handleSideBar} className='dashboard-arrow-dark dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard