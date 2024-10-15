import React, { useContext } from 'react';
import { Card, Badge, Button, CardHeader, Heading, Flex, Box, CardFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../../../utils/Contexts/userContext';

export default function OptionCWebDev () {
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        const token = localStorage.getItem('token');
        if (user?._id && token) {
            const mailtoLink = `mailto:supportus@mybizsolutions.us?subject=Interest in Expert Bundle&body=I am interested in the Expert Bundle. Please provide me with more information.`;
            window.location.href = mailtoLink;
        } else {
            navigate('/login');
        }
    };
    
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                        <Heading size='sm' color="gray.800">Expert Setup</Heading>
                        <Heading size='lg' ps={5} color="#FF851A">Let's Talk!</Heading>
                        <Flex alignItems='center' mt={2}>
                            <Heading size='sm' ps={5} color="#FF851A">email us</Heading>
                            <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                supportus@mybizsolutions.us
                            </Badge>
                        </Flex>
                        <Heading size='sm' color="gray.400">Custom Solutions for Peak Potential</Heading>
                    </Box>
                </Flex>
                </Flex>
            </CardHeader>

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                '& > button': {
                    minW: '136px',
                },
                }}
            >
                <Button flex='1' variant='ghost' onClick={handleGetStarted}>
                    Get Started
                </Button>
            </CardFooter>
        </Card>
  );
};