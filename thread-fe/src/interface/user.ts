export interface IUser {
    id?: number
    full_name?: string
    username?: string
    email?:string
    picture?: string
    profile_description?: string
    followers_count?: number
    followings_count?: number
}

export interface IProfile {
    id?: number
    full_name?: string
    username?: string
    email?:string
    profile_picture?: string
    profile_description?: string
    followers_count?: number
    followings_count?: number
}

export interface IUseSearch {
    id: number
    user_id: number
    full_name: string
    username?: string
    picture?: string
    description?: string
    followers_count?: number
    followings_count?: number
    is_followed: boolean
}

export interface IUserRegister {
    id?: number
    full_name?: string
    username?: string
    email?:string
    password?: string
}

export interface IUserLogin {
    email?:string
    password?: string
}