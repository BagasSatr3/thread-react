import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { useRegister } from "@/features/hooks/useRegister"

export function Register() {
    const {handleChange, handleRegister} = useRegister()

    return (
    <>
        <Box backgroundColor={"blackAlpha.700"}>
            <br />
            <br />
            <br />
            <Box display={"flex"} justifyContent={"center"}>
                <Box m={5} w={"27em"} border={"1px"} borderColor={'white'}>
                    <FormControl>
                        <Text fontSize={"3xl"} textAlign={"center"}>Form Register</Text>
                        <Box m={4}>
                            <Text mt={2} fontSize={"xl"}>Full Name</Text>
                            <Input name={"full_name"} placeholder="Your Full Name Here"  autoFocus={false} onChange={handleChange}/>
                            <Text mt={2} fontSize={"xl"}>Username</Text>
                            <Input name={"username"} placeholder="Your Username Here" autoFocus={false} onChange={handleChange}/>
                            <Text mt={2} fontSize={"xl"}>Email</Text>
                            <Input name={"email"} placeholder="Your Email Here" autoFocus={false} onChange={handleChange}/>
                            <Text mt={2} fontSize={"xl"}>Password</Text>
                            <Input type={"password"} name={"password"} placeholder="Your Email Here" autoFocus={false} onChange={handleChange}/>
                            <Button colorScheme={"black"} backgroundColor={"black"} onClick={handleRegister}>Create</Button>
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