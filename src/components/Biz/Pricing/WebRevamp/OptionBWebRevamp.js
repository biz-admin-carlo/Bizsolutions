import React, { useContext } from 'react';
import { Card, Badge, Button, CardBody, Text, CardHeader, Heading, Flex, Box, CardFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../../../utils/Contexts/userContext';

export default function OptionBWebRevamp () {
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        const token = localStorage.getItem('token');
        if (user?._id && token) {
            const mailtoLink = `mailto:webconsultant@bizsolutions.us?subject=Interest in Expert Bundle&body=I am interested in the Expert Bundle. Please provide me with more information.`;
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
                        <Heading size='sm' color="gray.800">Enterprise Revamp Package</Heading>
                        <Heading size='lg' ps={5} color="#FF851A">Let's Talk!</Heading>
                        <Flex alignItems='center' mt={2}>
                            <Heading size='sm' ps={5} color="#FF851A">email us</Heading>
                            <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                webconsultant@bizsolutions.us
                            </Badge>
                        </Flex>
                        <Heading size='sm' color="gray.400">Custom Solutions for Peak Potential</Heading>
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
                <Button flex='1' variant='ghost' onClick={handleGetStarted}>
                    Get Started
                </Button>
            </CardFooter>
        </Card>
  );
};