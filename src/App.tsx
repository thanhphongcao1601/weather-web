import React, { useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios'
import { City } from './models/city';
import { AiOutlineHeart } from "react-icons/ai";
import Constants from './helper/config';
import { fahrenheitToCelsius } from './helper/function';
import useStore from './zustand/store';
import Home from './components/Home';
import Detail from './components/Detail';
import { Badge, Box, Center, Input, Wrap, Text } from '@chakra-ui/react';

function App() {
  const [cityName, setLocation] = useState('');
  const [data, setData] = useState({} as City);
  const url = `${Constants.BASE_URL}?q=${cityName}&units=imperial&appid=${Constants.API_ID}`
  const store = useStore();

  const navigator = useNavigate()

  const gotoPage = (url: string) => {
    navigator(url)
  }

  const searchLocation = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (cityName === '') {
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
  }, [cityName]);

  const addToFavoriteList = (city: City) => {
    setData({})
    store.addCity(city)
  }

  return (
    <Box className="app">
      <Box>
        <Center>
          <Input
            marginTop='10px'
            w='70%'
            variant='outline'
            placeholder='Enter your cityName'
            value={cityName ?? ''}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={(event) => searchLocation(event)} />
        </Center>
        {
          data.id ? <Box className="search-result" onClick={() => addToFavoriteList(data)}>
            <Box className="result-value">
              <Text>{data.name}</Text>
              <Text>{fahrenheitToCelsius(data.main?.temp ?? 0).toFixed()}℃</Text>
              <Text>{data.weather?.at(0)?.main}</Text>
            </Box>
            <AiOutlineHeart size={30} />
          </Box> : null
        }
        <Center>
          <Wrap marginTop='20px' width='50%'>
            {store.listFavoriteCity.map((city) =>
              <Badge variant='outline' colorScheme='green'
                padding='5px'
                onClick={() => gotoPage(`detail/${city.name}`)}>
                {city.name} {fahrenheitToCelsius(city.main?.temp ?? 0).toFixed()}℃
              </Badge>
            )}
          </Wrap>
        </Center>
      </Box>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/detail/:cityName" element={<Detail />} />
      </Routes>
    </Box>
  );
}

export default App;
