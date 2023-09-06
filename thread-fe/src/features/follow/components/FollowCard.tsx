import { IFollow } from "@/interface/follow";
import { API } from "@/libs/api";
import { SET_FOLLOW } from "@/stores/rootReducer";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

export function FollowCard(props: IFollow) {
    const dispatch = useDispatch()
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

    return (
        <>
            <Box display={"flex"} width={"100%"} padding={"20px 0px"}>
                <Image src={props.picture ?? "/user-placeholder.png"} width={"50px"} height={"50px"} objectFit={"cover"} borderRadius={"50%"} marginRight={"5%"}></Image>

                <Box display={"flex"} width={"100%"}>
                    <Box display={"flex"} flexDirection={"column"} flex={2}>
                        <Box display={"flex"}>
                            <Text color={"white"}>{props.full_name}</Text>
                        </Box>
                        <Text color="grey">@{props.username}</Text>
                        <Text color={"white"}>{props.description}</Text>
                    </Box>
                    <Box flex={1} display={"flex"} justifyContent={"flex-end"}>
                        <Button onClick={() => handleFollow(props.id, props.user_id, props.is_followed)} backgroundColor={props.is_followed? "gray" : "white"}>
                            {props.is_followed? "Following" : "Follow"}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}