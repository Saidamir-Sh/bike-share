import { initialState } from "../store";
import { FETCH_USER_DATA,  FETCH_NETWORKS } from "../action";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
            }
        case FETCH_NETWORKS: 
            return {
                ...state,
                isLoading: false,
                bikeNetworks: action.payload,
            }
        default: 
            return {
                state
            }
    }
}