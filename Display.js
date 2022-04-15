import { useState, useEffect } from "react"
import axios from "axios"

const Display = ({wholeData, specificData}) => {
    const copyOfWholeData = [...wholeData]
    const API_KEY = '3317ede34715d470a47e9efe4a3bfd14'
    const listOfCountries = copyOfWholeData.filter(data => (data.name.common.toLowerCase()).indexOf(specificData.toLowerCase()) !== -1)
    const [country, setCountry] = useState(listOfCountries[0])
    const noUndefinedLanguages = listOfCountries.filter(data => data.languages !== undefined)
    const flag = listOfCountries.map(country => country.flags.png)
    const [show, setShow] = useState(false)
    let languages1 = noUndefinedLanguages.map(country => Object.values(country.languages))
    languages1 = languages1.flat()
    const countryLat = country.latlng[0]
    const countryLon = country.latlng[1]
    const [code, setCode] = useState('')
    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
  
    useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryLat}&lon=${countryLon}&appid=${process.env.API_KEY}&units=imperial`)
      .then(res => res.data)
      .then(res => {
        setCode(res.weather[0].icon)
        setTemperature(res.main.temp)
        setWindSpeed(res.wind.speed)
    })
  })
  
    if (listOfCountries.length > 10) {
      return (
        <div>
          <p>
            Too many matches, specify another filter
          </p>
        </div>
      )
    } else if (listOfCountries.length === 1) {
      return(
      <div>
        <h1><b>{country.name.common}</b></h1>
        <p><b>capital</b> {country.capital}</p>
        <p><b>area</b> {country.area}</p>
        <div></div>
        <p><b>languages:</b></p>
        <ul>
          {languages1.map(lan => <li>{lan}</li>)}
        </ul>
        <img src={flag}/>
        <h1>Weather in {country.capital[0]}</h1>
        <p> Temperature {temperature} Fahrenheit </p>
        <img src={`http://openweathermap.org/img/wn/${code}@2x.png`} />
        <p>Wind {windSpeed} m/s</p>
      </div>
      )
    } else if (listOfCountries.length <= 10) {
        return (
        <div>
          {listOfCountries.map((country, i) => <div><nobr>{country.name.common}</nobr> <button onClick={() => {
            setShow(!show)
            setCountry(listOfCountries[i])}}>show</button></div>)}
          {show ? <div><h1><b>{country.name.common}</b></h1>
        <p><b>capital</b> {country.capital}</p>
        <p><b>area</b> {country.area}</p>
        <div></div>
        <p><b>languages:</b></p>
        <ul>
          {(Object.values(country.languages)).map((lan, i) => <li key={i}>{lan}</li>)}
        </ul>
        <img src={country.flags.png}/>
        <h1>Weather in {country.capital[0]}</h1>
        <p> Temperature {temperature} Fahrenheit </p>
        <img src={`http://openweathermap.org/img/wn/${code}@2x.png`} />
        <p>Wind {windSpeed} m/s</p>
        </div> : ''}
        </div>
      )
    }
  }

  export default Display