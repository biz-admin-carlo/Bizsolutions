import React from 'react';
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

const paymentData = [
  {
    package: "Starter Setup Monthly",
    price: "$49.99 (Monthly)",
    stripeLink: "https://buy.stripe.com/4gw29odeP9xB1HO7sN",
    squareLink: "https://square.link/u/IlumVicQ"
  },
  {
    package: "Starter Setup Annually",
    price: "$539.88 (Annually)",
    stripeLink: "https://buy.stripe.com/bIYdS65Mn115cms28u",
    squareLink: "https://square.link/u/2Kpylrur"
  },
  {
    package: "Advanced Setup Monthly",
    price: "$99.99 Monthly",
    stripeLink: "https://buy.stripe.com/8wM5lA8Yz7ptaekbJc",
    squareLink: "https://square.link/u/SuyBCBGX"
  },
  {
    package: "Advanced Setup Annually",
    price: "$1,079.88 (Annually)",
    stripeLink: "https://buy.stripe.com/dR6eWafmXbFJ728aF9",
    squareLink: "https://square.link/u/4Ng3UBmV"
  },
  {
    package: "Professional Revamp Monthly",
    price: "$44.99 Monthly",
    stripeLink: "https://buy.stripe.com/6oEaFUgr1fVZ86c4gI",
    squareLink: "https://square.link/u/Y6UYxPe7"
  },
  {
    package: "Professional Revamp Annually",
    price: "$399.99 (Annually)",
    stripeLink: "https://buy.stripe.com/6oEaFU2AbbFJ7283cN",
    squareLink: "https://square.link/u/cZq0Ozt8"
  }
];

export default function PaymentLinks() {
  const evenRowBg = useColorModeValue('gray.100', 'gray.700');
  const linkColor = useColorModeValue('black.500', 'black.300');

  return (
    <Box maxW="container.xl" mx="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>Payment Guides</Heading>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Package</Th>
              <Th>Price</Th>
              <Th>Stripe Link</Th>
              <Th>Square Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paymentData.map((item, index) => (
              <Tr key={index} bg={index % 2 === 0 ? evenRowBg : 'transparent'}>
                <Td>{item.package}</Td>
                <Td>{item.price}</Td>
                <Td>
                  <Link
                    href={item.stripeLink}
                    isExternal
                    color={linkColor}
                    textDecoration="underline"
                    fontStyle="italic"
                  >
                    {item.stripeLink}
                  </Link>
                </Td>
                <Td>
                  {item.squareLink !== "-" ? (
                    <Link
                      href={item.squareLink}
                      isExternal
                      color={linkColor}
                      textDecoration="underline"
                      fontStyle="italic"
                    >
                      {item.squareLink}
                    </Link>
                  ) : (
                    "-"
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}