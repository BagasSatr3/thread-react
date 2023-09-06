import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import { IThreadCard } from "@/interface/thread";
import { API } from "@/libs/api";

export function RepliesCard() {
    const [replies, setReplies] = useState<IThreadCard[]>([])
    const { id } = useParams()

    const fetchData = async () => {
        try {
             const response = await API.get(`/replies?threadsId=${id}`)
             setReplies(response.data)
             console.log("this is thread detail data", response.data)
        } catch (err) {
            console.log('failed load replies', err)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        <Box>
            {replies?.map((reply, index) => {
                return (
                    <Box color={'white'} p={5} backgroundColor={'blackAlpha.300'} key={index}>
                    <Box display={'flex'} >
                    <Image src={reply.user?.profile_picture} objectFit={'cover'} rounded={'full'} w={'50px'} h={'50px'}/>
                    <Box>
                    <Box display={'flex'} alignItems={'center'} flexDirection={'row'} mt={3}>
                    <Text ml={5} fontWeight={'bold'}>{reply.user?.full_name}</Text>
                    <Text ml={3}>@{reply.user?.username}</Text>
                    <Text ml={3} fontWeight={'thin'} color={'grey'}>4h</Text>
                    </Box>
                    <Box ml={5} mt={2}>
                    <Text>{reply.content}</Text>
                    {/* <Image mt={2} maxW={'20em'} maxH={'18em'} objectFit={'contain'} src="https://images.alphacoders.com/130/1306217.jpg" /> */}
                    {/* <Box mt={3}>
                        <Button onClick={handlerLikeClick} colorScheme={isLiked ? "red" : "gray"}><i className="fa-regular fa-thumbs-up"></i>{likesCount}</Button>
                        <Link to={props.id.toString()} key={props.id}> 
                        <Button ml={5}>10 Replies</Button>
                        </Link>
                    </Box> */}
                    </Box>
                </Box>
                </Box>
            </Box>
                )
            })}
            
        </Box>
    </>
    )
}