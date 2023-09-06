import { IUser } from "@/interface/user";
import { setAuthToken } from "@/libs/api";
import { createSlice } from "@reduxjs/toolkit"

const initialAuthState: IUser = {
    // data: {
        id: 0,
        email: "",
        full_name: "",
        picture: "",
        username: "",
        profile_description: "",
        followers_count: 0,
        followings_count: 0,

    // }
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (state, action) => {
            const id = action.payload.id
            const email = action.payload.email
            const full_name = action.payload.full_name
            const username = action.payload.username
            const token = action.payload.token
            const profile_description = action.payload.profile_description
            const picture = action.payload.picture
            const followers_count = action.payload.followers_count
            const followings_count = action.payload.followings_count
            // const {
            //     id,
            //     email,
            //     full_name,
            //     username,
            //     profile_description,
            //     picture,
            //     followers_count,
            //     followings_count,
            // } = action.payload.user

            // const { token } = action.payload

            setAuthToken(token)
            localStorage.setItem("token", token)

            state.id = id
            state.email = email
            state.full_name = full_name
            state.username = username
            state.profile_description = profile_description
            state.picture = picture
            state.followers_count = followers_count
            state.followings_count = followings_count
        },
        AUTH_CHECK: (state, action) => {
            const {
                id,
                email,
                full_name,
                username,
                profile_description,
                picture,
                followers_count,
                followings_count,
            } = action.payload.user

            state.id = id
            state.email = email
            state.full_name = full_name
            state.username = username
            state.profile_description = profile_description
            state.picture = picture
            state.followers_count = followers_count
            state.followings_count = followings_count   
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem("token")
            // const navigate = useNavigate()
            // navigate('/login')
        },
    }
}) 