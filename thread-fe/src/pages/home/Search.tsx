import { FollowCard } from "@/features/follow";
import { SearchCard } from "@/features/search";
import { IFollow } from "@/interface/follow";
import { IUseSearch } from "@/interface/user";
import { API } from "@/libs/api";
import { GET_FOLLOWS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function Search() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResulls] = useState<IUseSearch[]>([])
    const followState = useSelector((state: RootState) => state.follow.followState)
    const follows = useSelector((state: RootState) => state.follow.follows)
    
    const handleSearch = async () => {  
        try {
            const res = await API.get(
                // `/search?q=${searchQuery}`
                `/search?q=${searchQuery}`
                // `/search\?type=${followState}`
                )
                
            // setSearchResulls(res.data)
            setSearchResulls(res.data)
            // dispatch(GET_FOLLOWS(res.data))
            
        } catch (error) {
            console.log(error)
        }
    }

    async function getFollowData() {
        const response = await API.get(`/follows?type=${followState}`)
        dispatch(GET_FOLLOWS(response.data))
    }

    useEffect(() => {
        handleSearch()
        getFollowData()
    }, [])

    return (
        <>
        <Box display={"flex"} mx={3} m={2} w={'42em'}>
                  <FormControl >
                    <Input name={"content"} color={'white'} id={"content"} required placeholder="Search Here!" onChange={(e) => setSearchQuery(e.target.value)} autoFocus={false} />
                  </FormControl>
                  {/* <FaImage h={'20em'}> */}
                    {/* <Input type={"file"} name={"image"} id={"image"}  /> */}
                  {/* </FaImage> */}
                  <Button onClick={handleSearch}>Search</Button>
              </Box>
              {/* {searchResults.filter((item) => {
                      return search.toLowerCase() === '' 
                      ? item 
                      : item.full_name.toLowerCase().includes(search)
                    }).map((item) => ( */}
            {/* <SearchCard key={item.id} full_name={item.full_name} description={item.description} id={item.id} picture={item.picture} username={item.username}/> */}
            {/* <SearchCard key={item.id} full_name={item.full_name} is_followed={item.is_followed} user_id={item.user_id} followers_count={item.followings_count} followings_count={item.followings_count} description={item.description} id={item.id} picture={item.picture} username={item.username}/> */}
            {/* ))} */}
            {searchResults.map((item) => (
                <SearchCard key={item.id} full_name={item.full_name} is_followed={item.is_followed} user_id={item.user_id} followers_count={item.followings_count} followings_count={item.followings_count} description={item.description} id={item.id} picture={item.picture} username={item.username}/>
                ))}
            {/* {follows.map((item, index) => (
                <FollowCard key={index}
                id={item.id}
                user_id={item.user_id}
                full_name={item.full_name}
                username={item.username}
                email={item.email}
                picture={item.picture}
                description={item.description}
                is_followed={item.is_followed}/>
            ))} */}
        </>
    )
}