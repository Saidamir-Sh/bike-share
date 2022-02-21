import { initialState } from "../store";

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HELLO':
            return {
                state
            }
    }
}