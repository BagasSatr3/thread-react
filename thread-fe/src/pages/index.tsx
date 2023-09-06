import {Box, Button, Grid, GridItem,} from "@chakra-ui/react"
import {RightBar, LeftBar} from '../features/thread'
import { Outlet, useNavigate } from "react-router-dom"
import { AUTH_LOGOUT } from "@/stores/rootReducer"
import { useDispatch } from "react-redux"
export function Pages() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(AUTH_LOGOUT())
        navigate('/login')
    }
    return (
        <>
        <Box backgroundColor={''} display={'flex'} >
           {/* <Box  w="75%"> */}
            <Grid templateColumns={'repeat(8, 1fr)'}>
            <GridItem colSpan={2}>
                <Box position={'fixed'}>
                    <LeftBar/>
                </Box>
            </GridItem>
            

           {/* </Box>
           <Box  w="100%"> */}
            <GridItem colSpan={4}>
            <Outlet/>
            </GridItem>

           {/* </Box>
           <Box w="100%"> */}

            <GridItem colSpan={2}>
                <Box position={'fixed'} bottom={0} top={0} overflowY={'scroll'} overscrollY={'none'} overflowX={'hidden'}>
                <RightBar/>
                </Box>
            </GridItem>
           {/* </Box> */}
            </Grid>
        </Box>
        <Button position={'fixed'} left={3} bottom={5} backgroundColor={'gray'} rounded={'50px'} onClick={() => handleLogout()}>Logout</Button>
        </>
    )
}