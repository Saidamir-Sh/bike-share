export const FETCH_COUNTRY_CODE = 'FETCH_COUNTRY_CODE'
export const FETCH_NETWORKS = 'FETCH_NETWORKS'
export const FETCH_STATIONS = 'FETCH_STATIONS'
export const TOGGLE_MODE = 'TOGGLE_MODE'
export const GET_USER_DATA = 'GET_USER_DATA'
export const CHANGE_POSITION = 'CHANGE_POSITION'

export const fetchCountryCode = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`https://ip.nf/me.json`)
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_COUNTRY_CODE,
                    payload: data.ip.country_code
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchNetworks = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`http://api.citybik.es/v2/networks`, {mode: 'cors'}, 
            {headers : {
                "x-rapidapi-host": "community-citybikes.p.rapidapi.com",
                "x-rapidapi-key": "6c32858c11mshafd50d3dee6dc14p1ac0b8jsnf6f06fe1b868"
            }}
            )
              console.log(response)
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_NETWORKS,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
} 

export const fetchBikeStations = (networkId) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`http://api.citybik.es${networkId}`, {mode: 'cors'}, 
            {headers : {
                "x-rapidapi-host": "community-citybikes.p.rapidapi.com",
                "x-rapidapi-key": "6c32858c11mshafd50d3dee6dc14p1ac0b8jsnf6f06fe1b868"
            }})
            if(response.ok) {
                let data = await response.json()
                console.log(data)
                dispatch({
                    type: FETCH_STATIONS,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const setUserLatLng = () => {
    return (dispatch) => {
        if(navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                let data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    checkCords: true,
                }
                dispatch({
                    type: GET_USER_DATA,
                    payload: data,
                })
            })
        }
    }
} 

export const searchHandler = (network) => {
    return (dispatch) => {
        let data = {
            latitude: network.location.latitude,
            longitude: network.location.longitude,
            checkCords: true,
            country: network.location.country,
        }
        dispatch({
            type: CHANGE_POSITION,
            payload: data,
        })
    }
}
