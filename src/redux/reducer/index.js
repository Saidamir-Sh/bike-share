import { initialState } from "../store";
import { FETCH_IP_LOCATION, FETCH_USER_DATA } from "../action";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IP_LOCATION:
            return {
                ...state,
                ipLocation: action.payload,
                isLoading: false,
            }
        case FETCH_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
            }
    }
}