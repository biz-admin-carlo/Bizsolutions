import React, { useContext } from 'react';
import { Card, Button, CardHeader, Heading, Text, Flex, Box, CardFooter, CardBody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../../../utils/Contexts/userContext';

export default function OptionBTrial() {
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    const paymentLink = 'https://buy.stripe.com/eVacO2gr15hl9ag5kH';

    const handleGetStarted = () => {
        const token = localStorage.getItem('token');
        if (user?._id && token) {
            window.location.href = paymentLink;
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
                    <Heading size='md' color="gray.800">15-Day Trial</Heading>
                    <Heading size='xl' ps={5} color="#FF851A">$5.99</Heading>
                    <Heading size='sm' color="gray.400">Boost business with key features</Heading>
                    </Box>
                </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text fontSize="sm" color="gray.800">
                    Unlock Your Business Potential! Try our free 15-day trial for essential features like priority listing, local website, SEO, and more!
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
            <Button flex='1' variant='ghost' onClick={handleGetStarted} style={{ color: '#FF851A' }}>
                Get Started
            </Button>

            </CardFooter>
        </Card>
  );
};

