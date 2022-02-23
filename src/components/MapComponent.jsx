import React, { useState } from 'react';
import '../styles/MapComponent.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchUserData, fetchNetworks } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
import { bikeNetwork, person } from './Icons';
 
const MapComponent = () => {

    const dispatch = useDispatch()

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [checkCords, setCheckCords] = useState(false)

    const countryCode = useSelector((state) => state.userData.country_code)
    const bikeNetworks = useSelector((state) => state.bikeNetworks.networks)

    const bikes = bikeNetworks.filter((network) => network.location.country == countryCode)

    useEffect(() => {
      if(navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
              setCheckCords(true)
          })
      }
    }, [])

    useEffect(() => {
      dispatch(fetchUserData())
      dispatch(fetchNetworks())
    }, [])

  return (
      !checkCords ? <h1>Loading...</h1> :
    <MapContainer center={[latitude, longitude]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={person} position={[latitude, longitude]}></Marker>
      {
        bikes.map((bike) => (
          <Marker
          key={bike.id}
          icon={ bikeNetwork }
          position={[bike.location.latitude, bike.location.longitude]}>
            <Popup>
              {bike.name}
            </Popup>
          </Marker>
  ))
      }
    </MapContainer>
  
  )
}

export default MapComponent