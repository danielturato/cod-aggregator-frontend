import React from 'react';
import { LinkBox, Box, LinkOverlay, Badge } from '@chakra-ui/react';




export const Tournament = (props) => {
    const start = Date.now()
    const end = props.start_time * 1000
    const secs = Math.floor((end - start) / 1000)
    //const diff = new Date(secs * 1000).toISOString().substr(11,8)
    const days = Math.floor(secs / (3600 * 24))

    const d = Math.floor(secs / (3600 * 24));
    const h = Math.floor(secs % (3600 * 24) / 3600);
    const m = Math.floor(secs % 3600 / 60);
    const s = Math.floor(secs % 60);
    const parts = [];

    if (d > 0) {
    parts.push(d + 'D');
    }

    if (h > 0) {
    parts.push(h + 'H');
    }

    if (m > 0) {
    parts.push(m + 'M');
    }

    if (s > 0) {
    parts.push(s + 'S');
    }

    const diff = parts.join(', ');


    return (
        <LinkBox mt="3" alignItems="flex-start" as="tournament" maxW="lg" p="6" borderWidth="1px" borderColor={props.site === "CMG" ? "#8AFF80" : "blue.200"} boxShadow="base" rounded="md" overflow="hidden" _hover={{
            boxShadow: "lg"
        }}>
            <Box
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                    mb="2"
                >
                    <LinkOverlay  href={props.link} isExternal rel="noopener noreferrer">
                        {props.name}
                    </LinkOverlay>
                </Box>
                <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2"  colorScheme={"teal"}>
                        {props.site}
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                     >
                        {"2v2"}  &bull; {props.prize} &bull; {props.region}
                    </Box>
                </Box>
            <Box display="flex" alignItems="baseline" mt="2">
                <Box color="gray" fontWeight="semibold" fontSize="md" textTransform="uppercase" mr="2">
                    Starts in 
                </Box>
                <Box color="red.300" fontWeight="semibold" fontSize="md">
                    {diff}
                </Box>
            </Box>
        </LinkBox>


    )

};


