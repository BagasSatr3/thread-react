import { IThreadCard } from "@/interface/thread"
import { Image, Box, Button, Text, Icon } from "@chakra-ui/react"
import {AiFillLike} from "react-icons/ai"
import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useThreadsCard } from "../hooks/useThreadCard"

export function ThreadCard(props: IThreadCard) {
  const navigate = useNavigate()

  const {handlePostLike} = useThreadsCard()

    return (
        <>
        <Box  >
        <Box color={'white'} p={5} backgroundColor={'blackAlpha.300'}>
          
        <Box display={'flex'} >
          <Image src={props.user?.profile_picture} objectFit={'cover'} rounded={'full'} w={'50px'} h={'50px'}/>
          <Box>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} mt={3}>
              <Text ml={5} fontWeight={'bold'} onClick={() => navigate(`/profile/${props.user?.id}`)} cursor={"pointer"}>{props.user?.username}</Text>
              <Text ml={3}>@{props.user?.full_name}</Text>
              <Text ml={3} fontWeight={'thin'} color={'grey'}>4h</Text>
            </Box>
            <Box ml={5} mt={2}>
              <Text>{props.content}</Text>
              <Image mt={2} src={props.image} />
              <Box mt={3}>
                
                <Button onClick={() => handlePostLike(props.id, props.is_liked)} color={props.is_liked ? "red" : "gray"}><Icon as={AiFillLike}></Icon> {props.likes_count}</Button>
                {/* <Link to={props.id.toString()} key={props.id}>  */}
                <Button ml={5} onClick={() => navigate(`/${props.id}`)}>Replies {props.replies_count}</Button>
                {/* </Link> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
        {/* <Box  >
        <Box color={'white'} p={5} backgroundColor={'blackAlpha.300'}>
        <Box display={'flex'} >
          <Image src={props.author_picture} objectFit={'cover'} rounded={'full'} w={'50px'} h={'50px'}/>
          <Box>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} mt={3}>
              <Text ml={5} fontWeight={'bold'}>{props.author_full_name}</Text>
              <Text ml={3}>@{props.author_username}</Text>
              <Text ml={3} fontWeight={'thin'} color={'grey'}>{props.posted_at}</Text>
            </Box>
            <Box ml={5} mt={2}>
              <Text>{props.content}</Text>
              <Image mt={4} src={props.image} objectFit={'cover'} rounded={'md'} w={'20em'} h={'18em'}/>
              <Box mt={5}>
                <Button onClick={handlerLikeClick} colorScheme={isLiked ? "red" : "gray"}><i className="fa-regular fa-thumbs-up "></i>{likesCount}</Button>
                <Link to={props.id.toString()} key={props.id}> 
                <Button ml={5}>{props.replies_count} Replies</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box> */}
      <hr />
        </>
    )
}