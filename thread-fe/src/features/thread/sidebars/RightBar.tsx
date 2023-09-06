import { FollowCard } from "@/features/follow"
import { ProfileCard } from "@/features/profile"
import { IFollow } from "@/interface/follow"
import { API } from "@/libs/api"
import { GET_FOLLOWS } from "@/stores/rootReducer"
import { RootState } from "@/stores/types/rootState"
import { Image, Box, Button, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export function RightBar() {
  // const [follows, setFollows] = useState<IFollow[]>([])
  const dispatch = useDispatch()
  const followState = useSelector((state: RootState) => state.follow.followState)
  // async function getUsers() {
  //   const response = await API.get(`/user`)
  //   setFollows(response.data)
  // }

  // useEffect(() =>{
  //   getUsers()
  // }, [])

    const follows = useSelector((state: RootState) => state.follow.follows)

    async function getFollowData() {
        const response = await API.get(`/follows?type=${followState}`)
        dispatch(GET_FOLLOWS(response.data))
    }

    useEffect(() => {
        getFollowData()
    }, [followState])

    return (
        <>
        <Box p={3} w={''} >
        <ProfileCard/>
        
        <br />

        
        <Box backgroundColor={'blackAlpha.400'} rounded={'lg'}>
            <Box p={3}>
            {follows.map((follow, index) => (
            <FollowCard 
              key={index}
              id={follow.id}
              user_id={follow.user_id}
              full_name={follow.full_name}
              username={follow.username}
              email={follow.email}
              picture={follow.picture}
              description={follow.description}
              is_followed={follow.is_followed}
            />
          ))}
            </Box>
        </Box>

      </Box>
      </>
    )
}