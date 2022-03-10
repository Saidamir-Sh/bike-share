import React, { useState } from 'react';
import '../styles/MapComponent.css';
import Loader from './Loader';
import Dashboard from './Dashboard';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchUserData, fetchNetworks, fetchBikeStations, setUserLatLng } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
import { bikeNetwork, person, stationIcon } from './Icons';
import RoutingMachine from './RoutingMachine';
 
const MapComponent = () => {

    const dispatch = useDispatch()
    
    const [bikeLat, setBikeLat] = useState(null)
    const [bikeLong, setBikeLong] = useState(null)
    const [checkBikeAdress, setCheckBikeAdress] = useState(false)
    const [station, setStationInfo] = useState({})

    const countryCode = useSelector((state) => state.countryCode)
    const bikeNetworks = useSelector((state) => state.bikeNetworks.networks) || []
    const isLightMode = useSelector((state) => state.isLightMode)
    const getStations = useSelector((state) => state.getStations)
    const stations = useSelector((state) => state.bikeStations.network?.stations)
    const latitude = useSelector((state) => state.position?.latitude)
    const longitude = useSelector((state) => state.position?.longitude)
    const userLat = useSelector((state) => state.userPosition.latitude)
    const userLng = useSelector((state) => state.userPosition.longitude)
    const checkCords = useSelector((state) => state.position?.checkCords)

    // positions for map view and marker
    const userPosition = [userLat, userLng]
    const coords = [latitude, longitude]
    
    const bikes = bikeNetworks.filter((network) => network.location?.country == countryCode)
  
    const setBikeAdress = (station) => {
      setBikeLat(station.latitude)
      setBikeLong(station.longitude)
      setStationInfo(station)

      setCheckBikeAdress(false)
      setCheckBikeAdress(true)
    }

    const SetViewOnClick = ({coords}) => {
      const map = useMap()
      map.setView(coords, map.getZoom());

      return null;
    }

 

    useEffect(async () => {
       await dispatch(fetchUserData())
       await dispatch(fetchNetworks())
       dispatch(setUserLatLng())
       
    }, [])


  return (
      !checkCords ? <Loader /> :
    <MapContainer center={coords} zoom={11} zoomControl={false}>
      <Dashboard />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className={!isLightMode ? 'default-map' : 'map-tiles'}
      />
      <Marker icon={person} position={userPosition}></Marker>

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
      {!getStations ? console.log('waiting...') :
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
       <SetViewOnClick coords={coords} />
        </MapContainer>
  
  )
}

export default MapComponent