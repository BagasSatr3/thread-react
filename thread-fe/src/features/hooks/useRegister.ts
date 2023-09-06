import { IUserRegister } from "@/interface/user";
import { useState, ChangeEvent } from "react"
import { API } from "@/libs/api";
import { useNavigate } from "react-router-dom";

export function useRegister() {
    const navigate = useNavigate()

    const [form, setForm] = useState<IUserRegister>({
        email: "",
        full_name: "",
        username: "",
        password: "",
    })
    
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    
    async function handleRegister() {
        try {
            const response = await API.post('/auth/register', form)
            navigate('/login')
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    
    return {handleChange, handleRegister}
}