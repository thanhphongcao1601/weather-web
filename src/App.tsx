import React, { useCallback, useState } from 'react';
import { Routes, Route, useNavigate} from "react-router-dom";
import axios from 'axios'
import { City } from './models/city';
import { AiOutlineHeart } from "react-icons/ai";
import Detail from './components/detail';
import Constants from './helper/config';
import { fahrenheitToCelsius } from './helper/function';
import Home from './components/home';
import useStore from './zustand/store';

function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({} as City);
  const url = `${Constants.BASE_URL}?q=${location}&units=imperial&appid=${Constants.API_ID}`
  const store = useStore();
  
  const navigator = useNavigate()

  const gotoPage = (url: string) => {
      navigator(url)
  }

  const searchLocation = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (location === '') {
      setData({})
    } else {
      if (event.key === 'Enter') {
        axios.get(url).then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
    }
  }, [location]);

  const addToFavoriteList = (city: City) => {
    setData({})
    store.addCity(city)
  }

  return (
    <div className="app">
      <div className="search">
        <input type="text"
          placeholder='Enter your location'
          value={location ?? ''}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={(event) => searchLocation(event)}
        />
        {
          data.id ? <div className="search-result" onClick={() => addToFavoriteList(data)}>
            <div className="result-value">
              <p className='bold'>{data.name}</p>
              <h2>{fahrenheitToCelsius(data.main?.temp ?? 0).toFixed()}℃</h2>
              <p>{data.weather?.at(0)?.main}</p>
            </div>
            <div className="result-options">
              <AiOutlineHeart size={30} />
            </div>
          </div> : null
        }
        <div className="smalllist">
          {store.listFavoriteCity.map((city) =>
            <span onClick={()=>gotoPage(`detail/${city.name}`)}>
              {city.name} {fahrenheitToCelsius(city.main?.temp ?? 0).toFixed()}℃{'  |  '}
            </span>
          )}
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/detail/:location" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
