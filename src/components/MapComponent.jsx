import React, { useState } from 'react';
import '../styles/MapComponent.css';
import Loader from './Loader';
import Dashboard from './Dashboard';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchCountryCode, fetchNetworks, fetchBikeStations, setUserLatLng } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
import { bikeNetwork, person, stationIcon } from './Icons';
import RoutingMachine from './RoutingMachine';

 
const MapComponent = () => {

    const dispatch = useDispatch()
    
    //==>> states for RoutingComponents(prop drilling)                                                                   
    const [bikeLat, setBikeLat] = useState(null)                      
    const [bikeLong, setBikeLong] = useState(null)                  
    const [checkBikeAdress, setCheckBikeAdress] = useState(false)     
    const [station, setStationInfo] = useState({})                  

    //==>> user data
    const countryCode = useSelector((state) => state.countryCode)
    const userLat = useSelector((state) => state.userPosition?.latitude)
    const userLng = useSelector((state) => state.userPosition?.longitude)

    const bikeNetworks = useSelector((state) => state.bikeNetworks.networks) || []
    const checkStations = useSelector((state) => state.checkStations)
    const stations = useSelector((state) => state.bikeStations.network?.stations)
    const latitude = useSelector((state) => state.position?.latitude)
    const longitude = useSelector((state) => state.position?.longitude)
    const checkCords = useSelector((state) => state.checkCords)

    // positions for map view and marker
    const userPosition = [userLat, userLng]
    const coords = [latitude, longitude]
    console.log(checkCords)
    
    const bikes = bikeNetworks.filter((network) => network.location?.country === countryCode) 
    
    // console.log(bikes.keys(bikes).length === 0)

    const setBikeAdress = (station) => {
      setBikeLat(station.latitude)
      setBikeLong(station.longitude)
      setStationInfo(station)

      setCheckBikeAdress(false)
      setCheckBikeAdress(true)
    }

    useEffect(() => {
      let el = document.getElementsByClassName('leaflet-routing-container')[0]
      if (el) {
        let dashboard = document.getElementById('dashboard')
        dashboard.appendChild(el)
      }
    }, [checkBikeAdress])

    useEffect(async () => {
       await dispatch(fetchCountryCode())
       await dispatch(fetchNetworks())
       await dispatch(setUserLatLng())
    }, [])
    // checkCords ? userPosition : 
  return (
      !checkCords ? <Loader /> :
    <MapContainer center={[latitude, longitude]} zoom={11} zoomControl={false}>
      <Dashboard coords={coords}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // className={!isLightMode ? 'default-map' : 'map-tiles'}
      />
      <Marker  position={userPosition}></Marker>
    {
        bikes?.map((bike) => (
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
      {!checkStations ? console.log('waiting...') :
        stations.map((station) => (
          <Marker
          key={station.id}
          icon={ stationIcon }
          position={[station.latitude, station.longitude]}
          eventHandlers={{click: () => setBikeAdress(station)}}
          >
            <Tooltip>
              <div style={{lineHeight: '3px'}}>
                <p className='font-weight-bold'>{station.name}</p>
                <p>{station.extra.slots} Slots</p>
                <p>{station.extra.slots - station.empty_slots} Bikes</p>
              </div>
            </Tooltip>
          </Marker>
        ))
      } 
      <ZoomControl position="topright" />
       {
         checkBikeAdress ?   <RoutingMachine checkBikeAdress={checkBikeAdress} userLat={userLat} userLong={userLng} bikeLat={bikeLat} bikeLong={bikeLong}/> : null
       }
       {/* <SetViewOnClick coords={coords} /> */}
        </MapContainer>
  
  )
}

export default MapComponent