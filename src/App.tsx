import React, {useState} from 'react';
import { Button } from './components/Button';
import {H1, H2, Subtext} from './components/Typography'
import { Card } from './components/Card';
import { Form } from './components/Form';
import {Input} from './components/Input';
import { Cell } from './components/Cell';
import { Row, Column } from './components/Grid';
import { WeatherResponse, WeatherOutput } from './interfaces/Weather';
import countries from './assets/countries.list.json'
import cities from './assets/city.list.json'
import axios from 'axios';
import dayjs from 'dayjs';
import './App.css'

const API_KEY = "d2c261391f52b4be3798da8d6e043660";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState('Mumbai')
  const [country, setCountry] = useState('India')
  const [weather, setWeather] = useState<WeatherOutput>()

  const getCountryCode = (countryName: string) => {
    const countryCode = countries.find(country => country.name.toLowerCase() === countryName.toLowerCase());
    if(!countryCode) {
      setWeather(undefined);
      throw new Error("Country Not Found")
    };
    return countryCode.code
  }

  const getCityLatLon = (cityName: string): {lat: number, lon: number} => {
    const cityFilter = cities
                        .filter(city => city.country === getCountryCode(country))
                        .find(city => city.name.toLowerCase() === cityName.toLowerCase());
    if(!cityFilter) {
      setWeather(undefined)
      throw new Error("City Not Found")
    }
    return {lat: cityFilter.coord.lat, lon: cityFilter.coord.lon}
  }

  const handleWeatherResponse = (res: WeatherResponse) => (setWeather({
      humidity: res.main.humidity,
      pressure: res.main.pressure,
      temp: Math.ceil(res.main.temp - 273.15),
      high: Math.ceil(res.main.temp_max - 273.15),
      low: Math.ceil(res.main.temp_min - 273.15),
      icon: res.weather[0].icon,
      weather: res.weather[0].main,
      description: res.weather[0].description,
      visibility: res.visibility/1000,
      country: res.sys.country,
      city: res.name,
      sunrise: res.sys.sunrise *1000,
      sunset: res.sys.sunset *1000,
      timezone: res.timezone *1000,
      windSpeed: res.wind.speed,
      windDegrees: res.wind.deg
    }))

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
    const {lat, lon} = getCityLatLon(city)
    axios.get<WeatherResponse>(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(res=>handleWeatherResponse(res.data));
    } catch(e: any) {
      console.log(e.message);
    }
  }
  

  return (
    <Card variant={"dashed"}>
      <H1>Weather App</H1>
      <Form>
      <Input value={city} onChange={(e) => setCity(e.target.value)}/>
      <Input value={country} onChange={(e) => setCountry(e.target.value)}/>
      <Button primary onClick={handleSubmit}>Submit</Button>
      </Form>
      {weather && <><Card variant={"solid"} style={{width: "75%"}}>
        <H2 style={{alignSelf: "flex-start"}}>{`${weather.city}, ${weather.country}. Weather`}</H2>
        <Subtext style={{alignSelf: "flex-start"}}>{`${dayjs(new Date().getTime() + weather.timezone).format('h:mm:ss A')}`}</Subtext>
        <div className={"box"}>
          <div>
            <H1 className='titleText'>{weather.temp}<span className='degrees'>o</span></H1>
          </div>
          <div className='detailsText'>
              <h4>Icon</h4>
              <h4>{weather.weather}</h4>
          </div>
        </div>
        <H2 style={{alignSelf: "flex-start"}}>{weather.description}</H2>
      </Card>
      <div className='detailsTable'>
        <Row>
          <Column>
            <Cell title={'High/Low'} value={`${weather.high}/${weather.low}`}/>
          </Column>
          <Column>
            <Cell title={'Wind'} value={`${weather.windSpeed} km/hr`}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <Cell title={'Humidity'} value={`${weather.humidity} %`}/>
          </Column>
          <Column>
            <Cell title={'Wind Direction'} value={`${weather.windDegrees} deg`}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <Cell title={'Pressure'} value={`${weather.pressure} hPa`}/>
          </Column>
          <Column>
            <Cell title={'Sunrise'} value={`${dayjs(weather.sunrise + weather.timezone).format('h:mm:ss A')}`}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <Cell title={'Visibility'} value={`${weather.visibility} Km`}/>
          </Column>
          <Column>
            <Cell title={'Sunset'} value={`${dayjs(weather.sunset + weather.timezone).format('h:mm:ss A')}`}/>
          </Column>
        </Row>
        
      </div></>}
    </Card>
  );
}

export default App;
