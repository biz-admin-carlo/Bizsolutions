import React, { useState } from 'react';
import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import OptionA from './OptionAWebDev.js';
import OptionB from './OptionBWebDev.js';
import OptionC from './OptionCWebDev.js';
import Catalogue from './Catalogue.js';

export default function MainTrial() {
    const [isAnnual, setIsAnnual] = useState(false);

    const handleSwitchChange = () => {
        setIsAnnual(prevState => !prevState);
    };

    return (
        <>  
            <Flex>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel mb='0' ps={3}>
                        Want to save up 10%? Go Annually!
                    </FormLabel>
                    <Switch size='lg' colorScheme='orange' isChecked={isAnnual} onChange={handleSwitchChange} />
                </FormControl>
            </Flex>


            <Flex justify="space-around" align="flex-start" wrap="wrap" my={6}>
                <OptionA isAnnual={isAnnual}/>
                <OptionB isAnnual={isAnnual}/>
                <OptionC isAnnual={isAnnual}/>
            </Flex>
            <Catalogue/>
        </>
    );
}
