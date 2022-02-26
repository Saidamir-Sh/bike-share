import L from 'leaflet'
import '../styles/Icon.css'
import bikePointer from "../assets/bikePointer.png"
import personPointer from "../assets/personPointer.png"
import stationPointer from '../assets/stationPointer.png'

const bikeNetwork = new L.Icon({
    iconUrl: bikePointer,
    iconSize: [50, 50],
    popupAnchor:  [1, -10],
})

const person = new L.Icon({
    iconUrl: personPointer,
    iconSize: [40, 40],
    popupAnchor:  [-3, -76]
})

const stationIcon = new L.Icon({
    iconUrl: stationPointer,
    iconSize: [30, 30],
    className: 'pulse circle',
}) 
export { bikeNetwork, person, stationIcon }