import React, { useState } from 'react';
import axios from 'axios'
import { City } from './models/city';
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from './components/detail';

function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({} as City);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0cba9751f041579df4eece69c8c4369e`

  const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  
  console.log('re render')
  
  const Home = () => {
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
          data.id ? <div className="search-result">
            <div className="result-value">
              <p className='bold'>{data.name}</p>
              <text>{data.main?.temp} F</text>
              <br />
              <text>{data.weather?.at(0)?.main}</text>
            </div>
            <div className="result-options">
              <AiOutlineHeart size={30}/>
            </div>
          </div> : null
        }
      </div>
      <table>
        <tbody>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Favourite</th>
          </tr>
          <tr>
            <td>1</td>
            <td>london</td>
            <td><AiFillHeart size={25} color='red'/></td>
          </tr>
          <tr>
            <td>1</td>
            <td>london</td>
            <td><AiFillHeart size={25} color='red'/></td>
          </tr>
        </tbody>
      </table>
    </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
