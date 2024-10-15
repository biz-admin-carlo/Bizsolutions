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
  "Premier Business Profile",
  "Contact Information",
  "Location",
  "Business Hours",
  "Payment Solutions",
  "Video Showcases",
  "Website Design",
  "Maintenance and Support",
  "Directory Submission",
  "Standard Security Measures",
  "E-Commerce Solution",
  "Payment Processing System"
];

const setupDetails = {
  "Professional Revamp Package": {
    "Business Profile": true,
    "Contact Information": true,
    "Location": true,
    "Business Hours": true,
    "Payment Solutions": true,
    "Video Showcases": true,
    "Website Design": true,
  },
  "Enterprise Revamp Package": {
    "Premier Business Profile": "Premium Profile",
    "Contact Information": "Detailed Information",
    "Location": "Physical Location with Interactive Maps",
    "Business Hours": "Hosting with Custom Domain",
    "Payment Solutions": "Multiple Payment Gateways",
    "Video Showcases": "Professionally Produced Content",
    "Website Design": "Superior Web Design"

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
              <Th textAlign="center" fontSize="sm">Professional Revamp Package</Th>
              <Th textAlign="center" fontSize="sm">Enterprise Revamp Package</Th>
            </Tr>
          </Thead>
          <Tbody>
            {features.map((feature, index) => (
              <Tr key={index}>
                <Td fontSize="sm" color="blue.900">{feature}</Td>
                {["Professional Revamp Package", "Enterprise Revamp Package"].map((setup) => (
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