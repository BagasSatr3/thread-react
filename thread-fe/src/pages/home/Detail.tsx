import { RepliesCard } from '@/features/reply'
import { ThreadDetail } from '../../features/thread'
import { Box, Button, FormControl, Input } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { API } from '@/libs/api'
import { IReply, IReplyPost } from '@/interface/reply'
import { IThreadCard } from '@/interface/thread'
import { useParams } from 'react-router-dom'

export function Detail() {

    const [threadId, setThreadId] = useState()
    const [replies, setReplies] = useState<IThreadCard[]>([])
    const { id } = useParams()
    // const [Threads, setThreads] = useState<IThreadCard[]>([])
    const [form, setForm] = useState<IReplyPost>({
      content: "",
      threadsId: +(id as string)
    })

    const fetchData = async () => {
        try {
            const res = await API.get("/replies", {
                headers: {
                    Authorization: `Bearer ${localStorage}`
                }
            })
            setReplies(res.data)
        } catch (err) {
            
        }
    }

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        console.log("ini value", value)
        setForm({
          ...form,
          [name]: value
        })
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        // const formData = new FormData()
        // formData.append("content", form.content)

        try {
            const response = await API.post("/replies", form)

            console.log("ini reply", response.data)
        } catch (err) {
            console.log("ini error", err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // const handleThreadId = (itemId) => {
    //     setThreadId(itemId)
    // }

    return (
        <>
            <ThreadDetail/>

            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
              <Box display={"flex"} mx={3} m={2}>
                  <FormControl >
                    <Input name={"content"} color={'white'} id={"content"} required placeholder="Here Reply" onChange={changeHandler} autoFocus={false} />
                  </FormControl>
                  {/* <FaImage h={'20em'}> */}
                    {/* <Input type={"file"} name={"image"} id={"image"}  /> */}
                  {/* </FaImage> */}
                  <Button colorScheme={"black"} backgroundColor={"black"} type='submit'>post</Button>
              </Box>
                    {/* {prev}iewImage && (
                      <Image objectFit={"cover"} width={"100%"} height={"15em"} mt={2} src={previewImage} flexDirection={"column"}/>
                      ) */}
                      <hr />
            </form>

            <RepliesCard/>
        </>
    )
}