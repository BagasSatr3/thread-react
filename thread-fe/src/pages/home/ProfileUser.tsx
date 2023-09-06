import { ProfileDetail } from "@/features/profile";
import { ThreadCard } from "@/features/thread";
import { IThreadCard } from "@/interface/thread";
import { IProfile } from "@/interface/user";
import { API } from "@/libs/api";
import { GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function Profile() {
    // const [profileThreads, setProfileThreads] = useState<IThreadCard[]>([])
    const [userProfile, setUserProfile] = useState<IProfile>()
    const threads = useSelector((state: RootState) => state.thread.threads);
    const dispatch = useDispatch()
    const { id } = useParams()

    const data = async () => {
        try {
            const res = await API.get(`/user/${id}`)
            console.log(res.data)
            setUserProfile(res.data)
            // setProfileThreads(res.data.threads)
            dispatch(GET_THREADS(res.data.threads))
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        data()
    }, [])
    return (
        <>
            {/* {userProfile.map((item,index) => ( */}
                <ProfileDetail key={userProfile?.id} followers_count={userProfile?.followers_count} followings_count={userProfile?.followings_count} full_name={userProfile?.full_name} id={userProfile?.id} profile_description={userProfile?.profile_description} profile_picture={userProfile?.profile_picture} username={userProfile?.username} email={userProfile?.email}/>
            {/* ))} */}

            <Box mt={6}>
                {threads.map((item,index) => (
                    <ThreadCard key={index} content={item.content} image={item.image} user={item.user} id={item.id} is_liked={item.is_liked} likes_count={item.likes_count} posted_at={item.posted_at} replies_count={item.replies_count}/>
                ))}
            </Box>
        </>
    )
}