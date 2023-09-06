import { API } from "@/libs/api";
import { GET_FOLLOWS, SET_FOLLOW_STATE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from 'react'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FollowCard } from "@/features/follow";

export function Follow() {
    const dispatch = useDispatch()
    const followState = useSelector((state: RootState) => state.follow.followState)
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
            <Box display={"flex"} >
                <Tabs isFitted variant={"enclosed"} width={"43em"} marginTop={"20px"}>
                    <TabList mb={"1em"}>
                        <Tab color={"white"} onClick={() => dispatch(SET_FOLLOW_STATE("followers"))}>
                            Followers
                        </Tab>
                        <Tab color={"white"} onClick={() => dispatch(SET_FOLLOW_STATE("followings"))}>
                            Followings
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
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
                        </TabPanel>
                        <TabPanel>
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
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}