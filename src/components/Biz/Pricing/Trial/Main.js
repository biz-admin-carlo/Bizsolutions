import React from 'react';
import { Flex } from '@chakra-ui/react';
import OptionA from './OptionATrial.js';
import OptionB from './OptionBTrial.js';
import Catalogue from './Catalogue.js';

export default function MainTrial() {

    return (
        <>
            <Flex justify="space-around" align="flex-start" wrap="wrap" my={6}>
                <OptionA />
                <OptionB />
            </Flex>
            <Catalogue/>
        </>
    );
}
