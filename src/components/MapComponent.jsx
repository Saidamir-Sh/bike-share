import React, { useState } from 'react';
import '../styles/MapComponent.css';
import Loader from './Loader';
import Dashboard from './Dashboard';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchUserData, fetchNetworks, fetchBikeStations } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
import { bikeNetwork, person, stationIcon } from './Icons';
import RoutingMachine from './RoutingMachine';
 
const MapComponent = () => {

    const dispatch = useDispatch()

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [bikeLat, setBikeLat] = useState(null)
    const [bikeLong, setBikeLong] = useState(null)
    const [checkBikeAdress, setCheckBikeAdress] = useState(false)
    const [checkCords, setCheckCords] = useState(false)

    const countryCode = useSelector((state) => state.userData.country_code)
    const bikeNetworks = useSelector((state) => state.bikeNetworks.networks) || []
    const isLoading = useSelector((state) => state.isLoading)
    const getStations = useSelector((state) => state.getStations)
    const stations = useSelector((state) => state.bikeStations.network?.stations)

    const bikes = bikeNetworks.filter((network) => network.location.country == countryCode)

    const setBikeAdress = (station) => {
      setBikeLat(station.latitude)
      setBikeLong(station.longitude)

      setCheckBikeAdress(false)
      setCheckBikeAdress(true)
    }

    useEffect(() => {
      if(navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
              setCheckCords(true)
          })
      }
    }, [])

    useEffect(async () => {
       await dispatch(fetchUserData())
       await dispatch(fetchNetworks())
    }, [])

  return (
      !checkCords ? <Loader /> :
    <MapContainer center={[latitude, longitude]} zoom={11} zoomControl={false}>
      <Dashboard latitude={latitude} longitude={longitude} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // className='map-tiles'
      />
      <Marker icon={person} position={[latitude, longitude]}></Marker>

      { 
        bikes.map((bike) => (
          <Marker
          key={bike.id}
          icon={ bikeNetwork }
          position={[bike.location.latitude, bike.location.longitude]}
          eventHandlers={{click: () => dispatch(fetchBikeStations(bike.href))}}
          >
            <Popup>
              {bike.name}
            </Popup>
          </Marker>
    ))
      }
      {!getStations ? console.log('waiting...') :
        stations.map((station) => (
          <Marker
          key={station.id}
          icon={ stationIcon }
          position={[station.latitude, station.longitude]}
          eventHandlers={{click: () => setBikeAdress(station)}}
          >
            <Popup>
              <div style={{lineHeight: '3px'}}>
                <p className='font-weight-bold'>{station.name}</p>
                <p>{station.extra.slots} Slots</p>
                <p>{station.free_bikes} Bikes</p>
              </div>
            </Popup>
          </Marker>
        ))
      } 
      <ZoomControl position="topright" />
       {
         checkBikeAdress ?   <RoutingMachine userLat={latitude} userLong={longitude} bikeLat={bikeLat} bikeLong={bikeLong}/> : console.log('waiting...')
       }
        </MapContainer>
  
  )
}

export default MapComponent