export const FETCH_IP_LOCATION = 'FETCH_IP_LOCATION'
export const FETCH_USER_DATA = 'FETCH_USER_DATA'
export const FETCH_NETWORKS = 'FETCH_NETWORKS'

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