import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { City } from '../models/city';
import { fahrenheitToCelsius } from '../helper/function';
import useStore from '../zustand/store';

const Detail = () => {
    const { location } = useParams()
    const [data, setData] = useState({} as City);
    const store = useStore()

    useEffect(() => {
        setData(store.listFavoriteCity.find(e => e.name === location) ?? {})
    },[location]);

    return (
        <div className="container">
            <div className="top">
                <div className="location">
                    <p>{data.name}</p>
                </div>
                <div className="temperature">
                    <h1>{fahrenheitToCelsius(data.main?.temp ?? 0).toFixed()}℃</h1>
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
    )
}

export default Detail