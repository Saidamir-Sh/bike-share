import L from 'leaflet'
import bikePointer from "../assets/bikePointer.png"
import personPointer from "../assets/personPointer.png"

const bikeNetwork = new L.Icon({
    iconUrl: bikePointer,
    iconSize: [50, 50],
    popupAnchor:  [1, -10]
})

const person = new L.Icon({
    iconUrl: personPointer,
    iconSize: [40, 40],
    popupAnchor:  [-3, -76]
})

export { bikeNetwork, person }