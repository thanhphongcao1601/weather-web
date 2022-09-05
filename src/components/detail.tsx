import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { City } from '../models/city';
import { fahrenheitToCelsius } from '../helper/function';
import useStore from '../zustand/store';
import { Box, Center, Divider, Spacer, Stat, Text,
    StatGroup, StatHelpText, StatLabel, StatNumber, Wrap } from '@chakra-ui/react';

const Detail = () => {
    const { cityName } = useParams()
    const [data, setData] = useState({} as City);
    const store = useStore()

    useEffect(() => {
        setData(store.listFavoriteCity.find(e => e.name === cityName) ?? {})
    }, [cityName]);

    return (
            <Center marginTop='50px'>
                <Box width='80%' h='400px' bg='RGBA(0, 0, 0, 0.4)' borderRadius='10px'>
                    <StatGroup padding='20px'>
                        <Stat>
                            <StatLabel>{data.name}</StatLabel>
                            <StatNumber>{fahrenheitToCelsius(data.main?.temp ?? 0).toFixed()}℃</StatNumber>
                            <StatHelpText>{data.weather?.at(0)?.main}</StatHelpText>
                        </Stat>
                    </StatGroup>
                    <Spacer h='200px'/>
                    <Center height='50px' textAlign='center'>
                        <Wrap bg='RGBA(0, 0, 0, 0.6)' padding='10px' borderRadius='10px'>
                            <Box >
                                <Text>Feels Like</Text>
                                <Text className='bold'>{data.main?.feels_like}</Text>
                            </Box>
                            <Box>
                                <Text>Humidity</Text>
                                <Text className='bold'>{data.main?.humidity}</Text>
                            </Box>
                            <Box>
                                <Text>Wind Speed</Text>
                                <Text className='bold'>{data.wind?.speed}</Text>
                            </Box>
                        </Wrap>
                    </Center>
                </Box>
            </Center>
    )
}

export default Detail