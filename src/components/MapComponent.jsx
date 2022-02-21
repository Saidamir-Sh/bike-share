import React from 'react';
import '../styles/MapComponent.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchIPLocation } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
 
const MapComponent = () => {
    const dispatch = useDispatch()
    const IP = useSelector((state) => state.ipLocation)
    console.log(IP)
    useEffect(() => {
      dispatch(fetchIPLocation())
    }, [])

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[57.505, -0.08]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent