import React from 'react';
import {
  Table,
  TableCaption,
  Text,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Container
} from '@chakra-ui/react';
import { FaCheck } from "react-icons/fa6";
import { GoDash } from "react-icons/go";

const features = [
  "Priority Business Listing*",
  "Social Media Management**",
  "Website Pages",
  "Business Email",
  "Responsive Design",
  "Search Engine Optimization (SEO)",
  "Hosting",
  "Maintenance and Support",
  "Directory Submission",
  "Standard Security Measures",
  "E-Commerce Solution",
  "Payment Processing System"
];

const setupDetails = {
  "Starter Setup": {
    "Website Pages": "Up to 5 pages",
    "Business Email": "Only 5",
    "Hosting": true,
    "E-Commerce Solution": false,
    "Payment Processing System": false
  },
  "Advanced Setup": {
    "Website Pages": "Up to 10 pages",
    "Business Email": "10 Custom business emails",
    "Hosting": "Hosting with Custom Domain",
    "E-Commerce Solution": false,
    "Payment Processing System": false
  },
  "Expert Setup": {
    "Website Pages": "Unlimited Pages",
    "Business Email": "30 Custom business emails",
    "Hosting": "Hosting with Custom Domain",
    "Search Engine Optimization (SEO)": "Advanced Search Ending Optimization",
    "Standard Security Measures": "Premium Security Measures",
    "E-Commerce Solution": true,
    "Payment Processing System": true
  }
};

export default function Catalogue() {
  return (
    <Container maxW="container.xl" p={3}>
      <Box textAlign="center" mb={6}>
        <Heading as="h2" size="md">Features Included</Heading>
      </Box>
      <TableContainer overflowX="auto" w="full">
        <Table variant="simple" width="100%">
          <TableCaption textAlign="center">
            <Text fontSize='sm'>* Priority Busines Listing are the similar features for Free Trial Package.</Text>  
            <Text fontSize='sm'>** Social Media Management includes all social media available.</Text>  
          </TableCaption>
          <Thead>
            <Tr>
              <Th fontSize="sm"></Th>
              <Th textAlign="center" fontSize="sm">Starter Setup</Th>
              <Th textAlign="center" fontSize="sm">Advanced Setup</Th>
              <Th textAlign="center" fontSize="sm">Expert Setup</Th>
            </Tr>
          </Thead>
          <Tbody>
            {features.map((feature, index) => (
              <Tr key={index}>
                <Td fontSize="sm" color="blue.900">{feature}</Td>
                {["Starter Setup", "Advanced Setup", "Expert Setup"].map((setup) => (
                  <Td key={setup} fontSize="sm" textAlign="start">
                    {setupDetails[setup][feature] ? (
                      typeof setupDetails[setup][feature] === 'string' ? 
                        setupDetails[setup][feature] : 
                        <FaCheck color="orange" />
                    ) : (
                      setupDetails[setup][feature] === false ? 
                        <GoDash /> : 
                        <FaCheck color="orange" />
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}