export const FETCH_IP_LOCATION = 'FETCH_IP_LOCATION'
export const FETCH_USER_DATA = 'FETCH_USER_DATA'
// export const GET_USER_LOCATION = 'GET_USER_LOCATION'

export const fetchIPLocation = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`https://ip.nf/me.json`)
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_IP_LOCATION,
                    payload: data.ip.ip
                })
            }
        } catch (error) {
            
        }
    }
}

export const fetchUserData = (IPadress) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`http://api.ipstack.com/${IPadress}?access_key=15633b167163620b5cd84ef60db62414`)
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_USER_DATA,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
} 
// export const getUserData = () => {
//     return (dispatch) => {
//             if(navigator.geolocation) {
//                 navigator.geolocation.watchPosition((position) => {
//                    dispatch({
//                        type: GET_USER_LOCATION,
//                        payload: position.coords
//                    })
//                })
//         } else {
//             alert('Unable to get location')
//         }
//     }
// }