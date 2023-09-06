import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import { Box, Button, FormControl, Image, Input, Text, useToast } from "@chakra-ui/react"
import { API } from '@/libs/api'
import { IThreadCard } from '@/interface/thread'
import { ThreadCard } from '@/features/thread'
import { FaImage } from 'react-icons/fa';
import { useThread } from '@/features/thread/hooks'

export function Thread() {
  const toast = useToast
  // const {handleChange, handleAddContent} = useThread()

    // function hook() {
    const [Threads, setThreads] = useState<IThreadCard[]>([])
    const [form, setForm] = useState({
      content: "",
      image: null
    })
    
    const [previewImage, setPreviewImage] = useState<string>("")

    const fetchData = async () => {
        try {
            const res = await API.get("/threads", {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            
            setThreads(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
      const {name, value, files} = event.target
      if(files) {
        console.log("ini files", files[0])
        const image = URL.createObjectURL(files[0])
        setPreviewImage(image)
        setForm({
          ...form,
          [name]: files[0]
        }) 
      } else {
        console.log("ini value", value)
        setForm({
          ...form,
          [name]: value
        })
      }
    }

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault()
      const formData = new FormData()
      formData.append("content", form.content)
      if (form.image) {
        formData.append("image", form.image)
      }

      try {
        const response = await API.post("/threads", formData)

        console.log(response.data, "ini post")
        setForm({
          content: "",
          image: null
        })

        setPreviewImage("")
        fetchData()
      } catch (err) {
        console.log("ini error", err)
        toast({
          title: "try again",
          status: "error"
        })
      }
    }

    useEffect(() => {
        fetchData()
    }, [])
    // return Threads
// }
// const nes = hook()

    return (

        <>
          <br />
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
              <Box display={"flex"}>
                  <FormControl >
                    <Input name={"content"} color={'white'} id={"content"} required placeholder="Here Content" value={form.content} autoFocus={false} onChange={changeHandler}/>
                  </FormControl>
                  {/* <FaImage h={'20em'}> */}
                    <Input type={"file"} name={"image"} id={"image"} onChange={changeHandler} />
                  {/* </FaImage> */}
                  <Button colorScheme={"black"} backgroundColor={"black"} type='submit'>post</Button>
              </Box>
                    {previewImage && (
                      <Image objectFit={"cover"} width={"100%"} height={"15em"} mt={2} src={previewImage} flexDirection={"column"}/>
                      )}
                      <br />
                      <hr />
            </form>



        <Box >
            {Threads.map((item,index) => (
        <ThreadCard key={index} content={item.content} image={item.image} user={item.user} id={item.id} is_liked={item.is_liked} likes_count={item.likes_count} posted_at={item.posted_at} replies_count={item.replies_count}/>
      ))}
        </Box>
        </>

    //     <Box >
    //         {Threads.map((item,index) => (
    //     <ThreadCard key={index} author_picture={item.author_picture}author_full_name={item.author_full_name} author_username={item.author_username} posted_at={item.posted_at} content={item.content}image={item.image} like_count={item.like_count} replies_count={item.replies_count} is_liked={item.is_liked}
    //     id={item.id}/>
    //   ))}
    //     </Box>

    )
}