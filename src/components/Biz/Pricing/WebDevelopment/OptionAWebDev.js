import React, { useContext } from 'react';
import { Card, Badge, Button, CardHeader, Heading, Flex, Box, CardFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../../../utils/Contexts/userContext';
import useCountingEffect from '../TypingEffects/Amount';

export default function OptionAWebDev ({ isAnnual }) {
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    const stripePaymentLinks = {
        monthly: "https://buy.stripe.com/4gw29odeP9xB1HO7sN",
        annual: "https://buy.stripe.com/bIYdS65Mn115cms28u"
    };
    
    const handleGetStarted = () => {
        const token = localStorage.getItem('token');
        if (user?._id && token) {
            const paymentLink = isAnnual ? stripePaymentLinks.annual : stripePaymentLinks.monthly;
            window.location.href = paymentLink;
        } else {
            navigate('/login');
        }
    };

    const price = isAnnual ? 44.99 : 49.99;
    const displayedPrice = useCountingEffect(price);
    
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Heading size='sm' color="gray.800">Starter Setup</Heading>
                            <Heading size='lg' ps={5} color="#FF851A">
                                ${displayedPrice}
                            </Heading>
                            <Flex alignItems='center' mt={2}>
                                <Heading size='sm' ps={5} color="#FF851A" mr={2}>per month</Heading>
                                <Badge fontSize='0.8em' colorScheme='green'>
                                    {isAnnual ? 'billed annually' : 'billed monthly'}
                                </Badge>
                            </Flex>
                            <Heading size='sm' color="gray.400">Boost Productivity, Unlock Performance</Heading>
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