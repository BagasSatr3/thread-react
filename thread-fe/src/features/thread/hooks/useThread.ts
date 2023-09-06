import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { IAddContent } from "@/interface/thread"
import { API } from '@/libs/api';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/types/rootState';
import { GET_THREADS } from '@/stores/rootReducer';

export function useThread() {
    const dispatch = useDispatch()
    const thread = useSelector((state: RootState) => state.thread)

    const [form, setForm] = useState<IAddContent>({
        content: "",
        image: "",
    })
    
    async function getThreads() {
        const res = await API.get(`/threads`)
        dispatch(GET_THREADS(res.data))
    }

    async function handlePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData()
        formData.append("content", form.content)
        formData.append("image", form.image as File)

        const res = await API.post("/threads", formData)
        console.log("data added: ", res)
        getThreads()
    }

    useEffect(() => {
        getThreads()
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target
        if (files) {
            setForm({
                ...form,
                [name]: files[0]
            })
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }
    }
    
    async function handleAddContent() {
        try {
            const response = await API.post('/threads', form, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
        
    }

    const fileInputRef = useRef<HTMLInputElement>(null)

    function handleButtonClick() {
        fileInputRef.current?.click()
    }
    
    return {handleChange, handlePost, handleButtonClick, fileInputRef, thread}

    
}