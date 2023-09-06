import { IThreadCard } from "@/interface/thread";
import { IProfile } from "@/interface/user";
import { API } from "@/libs/api";
import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

export function ProfileDetail(props: IProfile) {
    return (
        <Box backgroundColor={'blackAlpha.400'} rounded={'xl'}>
            <Box m={4} color={'white'}>
                <Text fontSize={'4xl'} p={1}>{props?.full_name}</Text>
                <Image src="https://images.alphacoders.com/130/1306217.jpg" objectFit={'cover'} rounded={'xl'} w={'41em'} maxH={'13em'}></Image>
                <Image src={props?.profile_picture} ml={10} mt={-20} objectFit={'cover'} rounded={'full'} w={'9em'} h={'9em'}/>
                <Text fontSize={'3xl'} mt={4}>{props?.full_name}</Text>
                <Text color={'gray'}>@{props?.username}</Text>
                <Text fontSize={'xl'}>{props?.profile_description}</Text>
                <Box display={'flex'} gap={2} mt={2}>
                    <Text>200</Text>
                    <Text color={'gray'}>Following</Text>
                    <Text ml={3}>200</Text>
                    <Text color={'gray'}>Followers</Text>
                </Box>
            </Box>
            <br />
        </Box>
    )
}