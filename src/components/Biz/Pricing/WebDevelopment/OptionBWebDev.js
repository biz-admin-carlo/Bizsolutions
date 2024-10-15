import React, { useContext } from 'react';
import { Card, Badge, Button, CardHeader, Heading, Flex, Box, CardFooter } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import userContext from '../../../../utils/Contexts/userContext';
import useCountingEffect from '../TypingEffects/Amount';

export default function OptionBWebDev ({ isAnnual }) {
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    const stripePaymentLinks = {
        monthly: "https://buy.stripe.com/8wM5lA8Yz7ptaekbJc",
        annual: "https://buy.stripe.com/dR6eWafmXbFJ728aF9"
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

    const price = isAnnual ? 89.99 : 99.99;
    const displayedPrice = useCountingEffect(price);
    
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                    <Heading size='sm' color="gray.800">Advanced Setup</Heading>
                    <Heading size='lg' ps={5} color="#FF851A">
                        ${displayedPrice}
                    </Heading>
                    <Flex alignItems='center' mt={2}>
                        <Heading size='sm' ps={5} color="#FF851A">per month</Heading>
                        <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                            {isAnnual ? 'billed annually' : 'billed monthly'}
                        </Badge>
                    </Flex>
                    <Heading size='sm' color="gray.400">Broaden Reach, Enhance Engagement</Heading>
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