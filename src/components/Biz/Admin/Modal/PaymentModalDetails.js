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
} from '@chakra-ui/react';

export default function PaymentModalDetails({ isOpen, onClose, paymentDetails }) {
  if (!paymentDetails) return null;

  // Helper function to render key-value pairs
  const renderRow = (label, value) => (
    <Tr key={label}>
      <Th fontWeight="bold" textAlign="left" width="40%">
        {label}
      </Th>
      <Td>{value || '-'}</Td>
    </Tr>
  );

  // Function to format amounts (e.g., converting cents to dollars)
  const formatAmount = (amountInCents) => {
    if (amountInCents == null || isNaN(amountInCents)) return '-';
    return `$${(amountInCents / 100).toFixed(2)}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payment Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple" size="sm">
            <TableCaption>Detailed Information about the Payment</TableCaption>
            <Thead>
              <Tr>
                <Th>Field</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Payment Result */}
              {renderRow(
                'Result',
                paymentDetails.result ? (
                  <Badge
                    colorScheme={
                      paymentDetails.result === 'successful'
                        ? 'green'
                        : paymentDetails.result === 'warning'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {paymentDetails.result}
                  </Badge>
                ) : (
                  '-'
                )
              )}

              {/* Message */}
              {renderRow('Message', paymentDetails.message)}

              {/* Subscription Package */}
              {renderRow('Subscription Package', formatAmount(paymentDetails.subscriptionPackage))}

              {/* Amount Collected */}
              {renderRow('Amount Collected', formatAmount(paymentDetails.amountCollected))}

              {/* Receipt URL */}
              {paymentDetails.receiptUrl &&
                renderRow(
                  'Receipt URL',
                  <Link href={paymentDetails.receiptUrl} color="teal.500" isExternal>
                    View Receipt
                  </Link>
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
