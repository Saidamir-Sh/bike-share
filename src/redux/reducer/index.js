import { initialState } from "../store";
import { FETCH_COUNTRY_CODE,  FETCH_NETWORKS, FETCH_STATIONS, TOGGLE_MODE, GET_USER_DATA, CHANGE_POSITION } from "../action";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_CODE:
            return {
                ...state,
                countryCode: action.payload,
            }
        case FETCH_NETWORKS: 
            return {
                ...state,
                bikeNetworks: action.payload,
            }
        case FETCH_STATIONS:
            return {
                ...state,
                bikeStations: action.payload,
                checkStations: true,
            }
        case GET_USER_DATA: 
            return {
                ...state,
                userPosition: action.payload,
            }
        case CHANGE_POSITION: 
            return {
                ...state,
                position: action.payload,
                checkCords: action.payload.checkCords,
                countryCode: action.payload.country,
            }
        default: {
            return {
                ...state
            }
        }
    }
}