import React, { useState } from 'react';
import axios from 'axios'
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BrowserRouter, Routes, Route, useParams  } from "react-router-dom";
import { City } from '../models/city';

const Detail = () => {
    let data = useParams() as City;
    return (
        <div className="app">
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temperature">
              <h1>{data.main?.temp}</h1>
            </div>
            <div className="description">
              <p className='bold'>{data.weather?.at(0)?.main}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className='bold'>{data.main?.feels_like}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className='bold'>{data.main?.humidity}</p>
              <p>Humidity</p>
  
            </div>
            <div className="wind">
              <p className='bold'>{data.wind?.speed}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
      )
}

export default Detail