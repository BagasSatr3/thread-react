import { useSelector } from "react-redux"
import rootReducer from "../rootReducer"

export type RootState = ReturnType<typeof rootReducer>

// const auth = useSelector((state : RootState) => state.auth.data)