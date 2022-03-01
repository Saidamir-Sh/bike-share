export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const FETCH_NETWORKS = 'FETCH_NETWORKS'
export const FETCH_STATIONS = 'FETCH_STATIONS'
export const FETCH_WEATHER = 'FETCH_WEATHER'

export const fetchUserData = () => {
    return async (dispatch) => {
        try {
            let response = await fetch(`https://ip.nf/me.json`)
            if(response.ok) {
                let data = await response.json()
                dispatch({
                    type: FETCH_USER_DATA,
                    payload: data.ip
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
            let response = await fetch('http://api.citybik.es/v2/networks')
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
            let response = await fetch(`http://api.citybik.es${networkId}`)
            if(response.ok) {
                let data = await response.json()
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

export const fetchWeather = (lat, long) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7340a641a93f6db8387533e0d1700d93`)
            if(response.ok) {
                let data =  await response.json()
                dispatch({
                    type: FETCH_WEATHER,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}