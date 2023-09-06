import { IUseSearch } from '@/interface/user'
import { API } from '@/libs/api'
import { SET_FOLLOW } from '@/stores/rootReducer'
import { Box, Button, FormControl, Image, Input, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function SearchCard(props: IUseSearch) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    async function handleFollow(id: number, followedUserId: number, isFollowed: boolean) {
        try {
            if (!isFollowed) {
                await API.post(`/follow`, {followed_user_id: followedUserId})
                dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed}))
            } else {
                await API.delete(`/follow/${followedUserId}`)
                dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed}))
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log("data props:", props.)
    
    return (
        <Box w={"42em"}>
            <Box display={"flex"} width={"100%"} padding={"20px 0px"}>
                <Image src={props.picture ?? "/user-placeholder.png"} width={"50px"} height={"50px"} objectFit={"cover"} borderRadius={"50%"} marginRight={"5%"}></Image>   
                    <Box display={"flex"} width={"100%"}>
                        <Box display={"flex"} flexDirection={"column"} flex={2}>
                            <Box display={"flex"}>
                                <Text color={"white"} onClick={() => navigate(`/profile/${props.id}`)} cursor={'pointer'}>{props.full_name}</Text>
                            </Box>
                            <Text color="grey">@{props.username}</Text>
                            <Text color={"white"}>{props.description}</Text>
                        </Box>
                        <Box flex={1} display={"flex"} justifyContent={"flex-end"}>
                            <Button onClick={() => handleFollow(props.id, props.user_id, props.is_followed)}>
                                {props.is_followed? "Unfollow" : "Follow"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
        </Box>
        
    )
}