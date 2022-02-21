import React, { useState } from 'react';
import '../styles/MapComponent.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchIPLocation, fetchUserData, getUserData } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
 
const MapComponent = () => {

    const dispatch = useDispatch()

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [checkCords, setCheckCords] = useState(false)

 
    useEffect(() => {
      if(navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
              setCheckCords(true)
          })
      }
    }, [])

  return (
      !checkCords ? <h1>Loading...</h1> :
    <MapContainer center={[latitude, longitude]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  
  )
}

export default MapComponent