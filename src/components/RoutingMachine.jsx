import React from "react";
import L, { control, Map, map, routing } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const createRoutineMachineLayer = ({ userLat, userLong, bikeLat, bikeLong }) => {
   
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(userLat, userLong),
      L.latLng(bikeLat, bikeLong)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    createMarker: function() {
      return null
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  })
  
  return instance;
  
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);


export default RoutingMachine;
