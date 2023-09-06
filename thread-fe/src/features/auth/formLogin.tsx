import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { useLogin } from "@/features/hooks"
import { useSelector } from "react-redux";
import { RootState } from "@/stores/types/rootState";

export function Login() {
    const {handleChange, handleLogin} = useLogin()
    const auth = useSelector((state: RootState) => state.auth)

    return (
    <>
        <Box backgroundColor={"blackAlpha.700"}>
            <br />
            <br />
            <Button onClick={() => console.log("ini data user dari redux:", auth)}>Klik Here</Button>
            <br />
            <Box display={"flex"} justifyContent={"center"}>
                <Box m={5} w={"27em"} border={"1px"} borderColor={'white'}>
                    <FormControl>
                        <Text fontSize={"3xl"} textAlign={"center"}>Form Login</Text>
                        <Box m={4}>
                            <Text mt={2} fontSize={"xl"}>Email</Text>
                            <Input name={"email"} placeholder="Your Email Here" autoFocus={false} onChange={handleChange}/>
                            <Text mt={2} fontSize={"xl"}>Password</Text>
                            <Input type={"password"} name={"password"} placeholder="Your Email Here" autoFocus={false} onChange={handleChange}/>
                            <Button colorScheme={"black"} backgroundColor={"black"} onClick={handleLogin}>Create</Button>
                        </Box>
                    </FormControl>  
                </Box>
            </Box>
            <br />
            <br />
            <br />
            <br />
            <br />
        </Box>
    </>
    )
}