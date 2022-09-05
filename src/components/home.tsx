import ListFavoriteCity from './FavoriteCityTable'
import { Box, Text } from '@chakra-ui/react'

function Home() {
  return (
    <>
      <Box h='30px' width='100%'></Box>
      <Text fontSize='3xl' textAlign='center'>FAVORITE LIST</Text>
      <Box h='30px' width='100%'></Box>
      <ListFavoriteCity />
    </>
  )
}

export default Home