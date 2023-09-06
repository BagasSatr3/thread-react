import { Box, FormControl, FormLabel, Image, Input, Text, Textarea } from "@chakra-ui/react";

export function ProfileEdit() {
    return (
        <>
            <Box >
                <Text fontSize={'3xl'}>Profile Edit</Text>
                <Box m={4} color={'white'}>
                    <Text fontSize={'4xl'} p={1}>Syusetu Kohaku</Text>
                    <Image src="https://images.alphacoders.com/130/1306217.jpg" objectFit={'cover'} rounded={'xl'} w={'41em'} maxH={'13em'}></Image>
                    <Image src='https://images.alphacoders.com/130/1306217.jpg' ml={10} mt={-20} objectFit={'cover'} rounded={'full'} w={'9em'} h={'9em'}/>
                    <FormControl mt={2}>
                        <FormLabel>Full Name</FormLabel>
                        <Input type='text' placeholder={'Syusetu Kohaku'}/>
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel>Username</FormLabel>
                        <Input type='text' placeholder={'@kohaku'}/>
                    </FormControl>
                    <FormControl mt={2}>
                        <FormLabel>Description</FormLabel>
                        <Textarea></Textarea>
                    </FormControl>
                    <Text fontSize={'3xl'} mt={4}>Syusetu Kohaku</Text>
                    <Text color={'gray'}>@kohaku</Text>
                    <Text fontSize={'xl'}>Konhaku irasai~</Text>
                
                </Box>
            </Box>
        </>
    )
}