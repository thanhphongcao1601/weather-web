import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fahrenheitToCelsius } from "../helper/function";
import useStore from "../zustand/store";

const ListFavoriteCity = () => {
    const store = useStore()
    const navigator = useNavigate()

    const gotoPage = (url: string) => {
        navigator(url)
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Pressure</th>
                    <th>Temperature</th>
                    <th>Favourite</th>
                </tr>
                {
                    store.listFavoriteCity.map((city, index) =>
                        <tr key={index} onClick={() => gotoPage(`/detail/${city.name}`)}>
                            <td>{index + 1}</td>
                            <td>{city.name}</td>
                            <td>{city.main?.pressure}</td>
                            <td>{fahrenheitToCelsius(city.main?.temp ?? 0).toFixed()}℃</td>
                            <td><AiFillHeart size={25} color='red' /></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default ListFavoriteCity