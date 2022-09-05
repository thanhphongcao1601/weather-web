import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fahrenheitToCelsius } from "../helper/function";
import useStore from "../zustand/store";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const ListFavoriteCity = () => {
    const store = useStore()
    const navigator = useNavigate()

    const gotoPage = (url: string) => {
        navigator(url)
    }

    return (
        <TableContainer w='70%' margin='auto'>
            <Table variant='simple' size='md'>
                <TableCaption>List weather of city in farorite list</TableCaption>
                <Thead>
                    <Tr>
                        <Th>No.</Th>
                        <Th>Name</Th>
                        <Th>Pressure</Th>
                        <Th>Temperature</Th>
                        <Th>Favourite</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        store.listFavoriteCity.map((city, index) =>
                            <Tr key={index} onClick={() => gotoPage(`/detail/${city.name}`)}>
                                <Td>{index + 1}</Td>
                                <Td>{city.name}</Td>
                                <Td>{city.main?.pressure}</Td>
                                <Td>{fahrenheitToCelsius(city.main?.temp ?? 0).toFixed()}℃</Td>
                                <Td><AiFillHeart size={25} color='red' /></Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ListFavoriteCity