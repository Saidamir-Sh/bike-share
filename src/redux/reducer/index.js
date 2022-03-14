import { initialState } from "../store";
import { FETCH_COUNTRY_CODE,  FETCH_NETWORKS, FETCH_STATIONS, TOGGLE_MODE, GET_USER_DATA, CHANGE_POSITION } from "../action";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_CODE:
            return {
                ...state,
                countryCode: action.payload,
                isLoading: false,
            }
        case FETCH_NETWORKS: 
            return {
                ...state,
                isLoading: false,
                checkCords: true,
                bikeNetworks: action.payload,
            }
        case FETCH_STATIONS:
            return {
                ...state,
                isLoading: false,
                bikeStations: action.payload,
                getStations: true,
                checkCords: true,
            }
        case TOGGLE_MODE: 
            return {
                ...state,
                isLightMode: !state.isLightMode
            }
        case GET_USER_DATA: 
            return {
                ...state,
                userPosition: action.payload,
                checkCords: true,
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