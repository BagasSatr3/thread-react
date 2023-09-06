import { IUserLogin } from "@/interface/user";
import { useState, ChangeEvent } from "react"
import { API } from "@/libs/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "@/stores/rootReducer";

export function useLogin() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState<IUserLogin>({
        email: "",
        password: "",
    })
    
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    
    async function handleLogin() {
        try {
            // const [token, setToken] = useState('')
            // navigate('/')
            const response = await API.post('/auth/login', form)
            // const receivedToken = response.data.token
            // localStorage.setItem("token", receivedToken)
            
            dispatch(AUTH_LOGIN(response.data))
            
            // if (response.status === 200) {
                // setToken(receivedToken)
                navigate('/')
                console.log("login success")
            // }
            // console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
    
    return {handleChange, handleLogin}
}