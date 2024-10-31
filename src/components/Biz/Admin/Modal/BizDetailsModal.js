import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Link,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

export default function BizDetailsModal({ isOpen, onClose, business }) {
  if (!business) return null;

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '-';
    const date = new Date(dateTime);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  // Helper function to render key-value pairs
  const renderRow = (label, value) => (
    <Tr key={label}>
      <Th fontWeight="bold" textAlign="left" width="30%">
        {label}
      </Th>
      <Td>
        {value || '-'}
      </Td>
    </Tr>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Business Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple" size="sm">
            <TableCaption>Detailed Information about the Business</TableCaption>
            <Thead>
              <Tr>
                <Th>Field</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Basic Information */}
              {renderRow("Name", business.name)}
              {renderRow("Alias", business.alias)}
              {renderRow("Created At", formatDateTime(business.createdAt))}
              {renderRow("Last Updated", formatDateTime(business.updatedAt))}
              {renderRow("Business Age", `${business.bizAge} Days`)}

              {/* Contact Information Section */}
              <Tr>
                <Th colSpan={2} bg="gray.100">
                  <Text fontWeight="bold">Contact Information</Text>
                </Th>
              </Tr>
              {renderRow("Display Phone", business.display_phone)}
              {renderRow("Email", business.email ? <Link href={`mailto:${business.email}`} color="teal.500">{business.email}</Link> : '-')}
              {renderRow("Phone", business.phone)}

              {/* Location Section */}
              <Tr>
                <Th colSpan={2} bg="gray.100">
                  <Text fontWeight="bold">Location</Text>
                </Th>
              </Tr>
              {renderRow("Address", `${business.location.address1}${business.location.address2 ? `, ${business.location.address2}` : ''}${business.location.address3 ? `, ${business.location.address3}` : ''}`)}
              {renderRow("City", business.location.city)}
              {renderRow("State", business.location.state)}
              {renderRow("Zip Code", business.location.zip_code)}
              {renderRow("Coordinates", `Latitude: ${business.coordinates?.coordinates[1] || '-'}, Longitude: ${business.coordinates?.coordinates[0] || '-'}`)}

              {/* Additional Information Section */}
              <Tr>
                <Th colSpan={2} bg="gray.100">
                  <Text fontWeight="bold">Additional Information</Text>
                </Th>
              </Tr>
              {renderRow("Website", business.url ? <Link href={business.url} color="teal.500" isExternal>{business.url}</Link> : '-')}
              {renderRow("Business Status", business.bizStatus ? <Badge colorScheme={business.bizStatus === 'pending' ? 'yellow' : 'green'}>{business.bizStatus}</Badge> : '-')}
              {renderRow("Payment Status", business.paymentStatus ? <Badge colorScheme={business.paymentStatus === 'pending' ? 'yellow' : 'green'}>{business.paymentStatus}</Badge> : '-')}
              {renderRow("Categories", business.categories && business.categories.length > 0 ? business.categories.map((category, index) => (
                <Badge key={index} colorScheme="purple" mr={1}>{category.title}</Badge>
              )) : '-')}
              {renderRow("Transactions", business.transactions && business.transactions.length > 0 ? business.transactions.map((transaction, index) => (
                <Badge key={index} colorScheme="blue" mr={1}>{transaction}</Badge>
              )) : '-')}
              {renderRow("Review Count", business.review_count)}
              {renderRow("Is Archived", business.isArchived ? 'Yes' : 'No')}
              {renderRow("Is Business DB", business.isBizDB ? 'Yes' : 'No')}
              {renderRow("Is Closed", business.is_closed ? 'Yes' : 'No')}

              {/* Business Images Section */}
              {business.biz_images && business.biz_images.length > 0 && (
                <>
                  <Tr>
                    <Th colSpan={2} bg="gray.100">
                      <Text fontWeight="bold">Business Images</Text>
                    </Th>
                  </Tr>
                  <Tr>
                    <Td colSpan={2}>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {business.biz_images.map((image, index) => (
                          <Image
                            key={index}
                            src={image.url} // Ensure each image object has a 'url' property
                            alt={`Biz Image ${index + 1}`}
                            boxSize="150px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                        ))}
                      </SimpleGrid>
                    </Td>
                  </Tr>
                </>
              )}
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
