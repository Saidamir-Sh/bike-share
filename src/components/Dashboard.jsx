import React from 'react'
import '../styles/Dashboard.css'
import { fetchWeather } from '../redux/action'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/logo.png'
function Dashboard({latitude, longitude}) {

    const dispatch = useDispatch()

   const weather = useSelector((state) => state.weather)
   const city = useSelector((state) => state.weather.name)
   const temp = useSelector((state) => state.weather.main.temp)
   const country = useSelector((state) => state.weather.sys.country)
   const description = useSelector((state) => state.weather.weather[0].description)
   const iconID = useSelector((state) => state.weather.weather[0].icon)

    useEffect(() => {
        dispatch(fetchWeather(latitude, longitude))
    }, [])
  return (
        <div className='dashboard'>
           <div className='dashboard-weather d-flex justify-content-between align-items-center px-3' style={{border: '1px solid red'}}>
                <div>
                    <p>{temp} &#8451;</p>
                    <p>{city}, {country}</p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <img  src={`https://openweathermap.org/img/wn/${iconID}.png`} alt='weather icon' />
                    <p>{description}</p>
                </div>
           </div>
        </div>
  )
}

export default Dashboard