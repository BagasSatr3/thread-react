import { Box, Text, Image} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
// import ThreadsData from '../../../utils/dummy-data.json';
import {useEffect, useState} from 'react';
// import { ThreadCard } from ".";
import { API } from "@/libs/api";
import { IThreadCard } from "@/interface/thread";
import { ThreadCard } from ".";

export function ThreadDetail() {
  const [Threads, setThreads] = useState<IThreadCard>()
  const { id } = useParams()
  const fetchData = async () => {
      try {
          const res = await API.get(`/threads/${id}`)
          setThreads(res.data)
      } catch (err) {
          console.log(err)
      }
      return fetchData
  }

  useEffect(() => {
      fetchData()
  }, [])

    // const {id} = useParams();
    // // const [Threads] = useState(ThreadsData);
    // const element = Threads.find(el => el.id === Number(id));
  
    return  (
        <>
        <Box  >

        <Box>
        <ThreadCard key={Threads?.id} content={Threads?.content} image={Threads?.image} user={Threads?.user} id={Threads?.id}/>
        </Box>


        {/* <Box color={'white'} p={5} backgroundColor={'blackAlpha.300'}>
        <Box display={'flex'} >
          <Image src={Threads?.user?.profile_picture} objectFit={'cover'} rounded={'full'} w={'50px'} h={'50px'}/>
          <Box>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'} mt={3}>
              <Text ml={5} fontWeight={'bold'}>{Threads?.user?.username}</Text>
              <Text ml={3}>@{Threads?.user?.username}</Text>
              <Text ml={3} fontWeight={'thin'} color={'grey'}>4</Text>
            </Box>
            <Box ml={5} mt={2}>
              <Text>{Threads?.content}</Text>
              <Image mt={4} src={Threads?.image} objectFit={'cover'} rounded={'md'}/>
              <Box mt={5}>
                <Button onClick={handlerLikeClick} colorScheme={isLiked ? "red" : "gray"}><i className="fa-regular fa-thumbs-up "></i>{likesCount}</Button>
                <Link to={"/detail/" + element.id} key={element.id}> 
                <Button ml={5}>{element.replies_count} Replies</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> */}
      </Box>
        </>
    ) 
}