import React from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Text,
  Link,
  Select,
  Center,
  Button,
  Stack,
} from '@chakra-ui/react';
import { ExternalLinkIcon, SearchIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useQuery } from 'react-query';
import { Tournament } from './Tournament';

const BASE_URL = "https://vanguard-api.herokuapp.com/tournaments?"

function App() {
  const [region, setRegion] = React.useState("na")
  const [teamSizes, setTeamSizes] = React.useState("1")
  //const [tournaments, setTournaments] = React.useState([])

  const {
      isIdle,
      isLoading,
      isError,
      data,
      error,
      refetch,
      isFetching,
  } = useQuery(['tournaments', teamSizes, region], async () =>  await fetchTournaments(teamSizes, region), {enabled: false, initialData: []})

  return (
    <ChakraProvider theme={theme}>
        <Text size="lg" fontWeight={"bold"} ml="3">v0.1</Text>
        <Box textAlign="center" fontSize="xl">
          <Center mt="5">
            <Stack direction="row" >
              <Text>
                created by <Link isExternal href="https://twitter.com/Remedy0_" color="gray.500" >remedy<ExternalLinkIcon mx="2px"/></Link>
              </Text>
              <ColorModeSwitcher justifySelf="flex-end" />

            </Stack>
          </Center>
          <Text mt="10">
            Find tournaments for Call of Duty Vanguard on <Link color="teal.500" href="https://www.checkmategaming.com/" isExternal>CMG</Link>, <Link color="teal.500" href="https://gamebattles.majorleaguegaming.com/" isExternal>GB</Link> & <Link color="teal.500" href="https://www.umggaming.com/" isExternal>UMG (coming soon..)</Link> 
          </Text>
          <Text> Note: The data recieved varies per website</Text>
          <Center mt="5">
            <Stack direction="row" spacing={10}>
                <Select isDisabled={isFetching} maxW="xs" onChange={e => setRegion(e.target.value)}>
                <option value="na">NA</option>
                <option value="eu">EU</option>
                <option value="na_eu">NA+EU</option>
              </Select>
              <Select isDisabled={isFetching} maxW="xs" onChange={e => setTeamSizes(e.target.value)}>
                <option value="1">1v1</option>
                <option value="2">2v2</option>
                <option value="3,4">3v3/4v4</option>
              </Select>
              {/* {isFetching ? (
                <Button  pl={8} pr={8} colorScheme="teal" size="md" maxW="md"></Button>
              ) : (
                
              )} */}
              <Button isLoading={isFetching} onClick={refetch} leftIcon={<SearchIcon/>} pl={8} pr={8} colorScheme="teal" size="md" maxW="md"><Center>Find</Center></Button>
            </Stack>
          </Center>
          {isIdle ? (
            <>
            </>
          ) : error ? (
            <Text color="red.400">
              Server error. Please try again in a few secs.
            </Text>
          ): data !== undefined & data.length > 0 ? (
            <Grid minH="100vh" p={10}>
              <VStack spacing={8}>
                {data.map((t, idx)=> {
                  return <Tournament key={idx} {...t}/>
                })}
              </VStack>
           </Grid>
          ): isLoading ? (
            <Text mt="5">Queries can take up to 20 seconds to resolve</Text>
          ): isError ? (
            <Text color="red.400">
              Server error. Please try again in a few secs.
            </Text>
          ): (
            <Text mt="5">Queries can take up to 20 seconds to resolve</Text>
          )}
          
        </Box>
    </ChakraProvider>
  );
}

const fetchTournaments = async (team_sizes, region) => {
  const query = BASE_URL + "team_sizes=" + team_sizes + "&region=" + region;

  try {
      const resp = await axios.get(query);
      return resp.data
  } catch (err) {
      console.error(err)
  }
}

export default App;
