// import React, { useState } from 'react';
// import { Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react';
// import OptionA from './OptionAWebRevamp.js';
// import OptionB from './OptionBWebRevamp.js';
// import Catalogue from './Catalogue.js';

// export default function MainWebRevamp() {
//     const [isAnnual, setIsAnnual] = useState(false);

//     const handleSwitchChange = () => {
//         setIsAnnual(prevState => !prevState);
//     };

//     return (
//         <>
//             <Flex>
//                 <FormControl display='flex' alignItems='center'>
//                     <FormLabel mb='0' ps={3}>
//                         Want to save up 10%? Go Annually!
//                     </FormLabel>
//                     <Switch size='lg' colorScheme='orange' isChecked={isAnnual} onChange={handleSwitchChange} />
//                 </FormControl>
//             </Flex>

//             <Flex justify="space-around" align="flex-start" wrap="wrap" my={8}>
//                 <OptionA isAnnual={isAnnual} />
//                 <OptionB isAnnual={isAnnual} />
//             </Flex>
//             <Catalogue/>
//         </>
//     );
// }



import React, { useState } from 'react';
import { Box, Flex, FormControl, FormLabel, Switch, SimpleGrid } from '@chakra-ui/react';
import OptionA from './OptionAWebRevamp.js';
import OptionB from './OptionBWebRevamp.js';
import Catalogue from './Catalogue.js';

export default function MainWebRevamp() {
    const [isAnnual, setIsAnnual] = useState(false);

    const handleSwitchChange = () => {
        setIsAnnual(prevState => !prevState);
    };

    return (
        <Box maxWidth="1200px" margin="0 auto" padding="20px">
            <Flex justify="flex-start" mb={4}>
                <FormControl display='flex' alignItems='center' width="auto">
                    <FormLabel htmlFor='annual-switch' mb='0' mr={3}>
                        Want to save up 10%? Go Annually!
                    </FormLabel>
                    <Switch 
                        id='annual-switch'
                        size='lg' 
                        colorScheme='orange' 
                        isChecked={isAnnual} 
                        onChange={handleSwitchChange} 
                    />
                </FormControl>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={8}>
                <OptionA isAnnual={isAnnual} />
                <OptionB isAnnual={isAnnual} />
            </SimpleGrid>

            <Catalogue/>
        </Box>
    );
}