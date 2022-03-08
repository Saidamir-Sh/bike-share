import { initialState } from "../store";
import { FETCH_USER_DATA,  FETCH_NETWORKS, FETCH_STATIONS, FETCH_WEATHER, TOGGLE_MODE, GET_USER_DATA } from "../action";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                countryCode: action.payload,
                isLoading: false,
            }
        case FETCH_NETWORKS: 
            return {
                ...state,
                isLoading: false,
                bikeNetworks: action.payload,
            }
        case FETCH_STATIONS:
            return {
                ...state,
                isLoading: false,
                bikeStations: action.payload,
                getStations: true,
            }
        case TOGGLE_MODE: 
            return {
                ...state,
                isLightMode: !state.isLightMode
            }
        case GET_USER_DATA: 
            return {
                ...state,
                position: action.payload
            }
        default: {
            return {
                ...state
            }
        }
    }
}