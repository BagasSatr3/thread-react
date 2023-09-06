import { IThreadCard } from "@/interface/thread";
import { API } from "@/libs/api";
import { GET_THREADS, SET_THREAD_LIKE } from "@/stores/rootReducer";
import { RootState } from "@/stores/types/rootState";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function useThreadsCard() {
    const dispatch = useDispatch()
    const threads = useSelector((state: RootState) => state.thread.threads)

    async function handlePostLike(id: number, isLiked: boolean) {
        try {
            console.log(id, isLiked)
            if (!isLiked) {
                const res = await API.post("/like", { threadsId: id })
                dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }))
                console.log("successfully add like", res.data)
            } else {
                const res = await API.delete(`/like/${id}`)
                dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }))
                console.log("successfullu delete like", res.data)
            }
        } catch (err) {
            console.log("failed update like", err)
        }
    }

    return {
        handlePostLike,
        threads
    }
}