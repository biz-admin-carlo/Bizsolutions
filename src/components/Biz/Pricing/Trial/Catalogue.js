import React from 'react';
import {
  Table,
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
  "Business Profile",
  "Contact Information",
  "Physical Address",
  "Store Hours & Availability",
  "Map Integration",
  "Different Payment Methods",
  "Links to Your Other Sites",
  "Up to 5 pages",
  "1 Business email",
  "Responsive Design",
  "Social Media Integration",
  "Search Engine Optimization (SEO)",
  "Free Hosting",
];

const freeTrialExclusions = [
  "Up to 5 pages",
  "1 Business email",
  "Responsive Design",
  "Social Media Integration",
  "Search Engine Optimization (SEO)",
  "Free Hosting",
];

export default function Catalogue() {
  return (
    <Container maxW="container.xl" p={3}>
        <Box textAlign="center" mb={6}>
            <Heading as="h2" size="md">Features Included</Heading>
        </Box>        
        <TableContainer overflowX="auto" w="full">
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th fontSize="sm"></Th>
                <Th textAlign="center" fontSize="sm">Free Trial</Th>
                <Th textAlign="center" fontSize="sm">15-Day Trial</Th>
              </Tr>
            </Thead>
            <Tbody>
              {features.map((feature, index) => (
                <Tr key={index}>
                  <Td fontSize="sm" color="blue.900">{feature}</Td>
                  <Td textAlign="center">
                    {freeTrialExclusions.includes(feature) ? (
                      <GoDash />
                    ) : (
                      <FaCheck color="orange" />
                    )}
                  </Td>
                  <Td textAlign="center"><FaCheck color="orange" /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    </Container>
  );
};