import React, { useContext } from 'react';
import { Card, Button, CardHeader, Heading, Text, Flex, Box, CardFooter, CardBody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../../../utils/Contexts/userContext';

export default function OptionATrial () {
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        const token = localStorage.getItem('token');
        if (user?._id && token) {
            navigate('/my-biz');
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
                    <Heading size='md' color="gray.800">Free Trial</Heading>
                    <Heading size='xl' ps={5} color="#FF851A">Bizness with us!</Heading>
                    <Heading size='sm' color="gray.400">Initiate Your Business With Us</Heading>
                    </Box>
                </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text fontSize="sm">
                    Kickstart Your Bizness! Start your free trial today and enjoy features like priority listing, business profile, contact info, and more!
                </Text>
            </CardBody>

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