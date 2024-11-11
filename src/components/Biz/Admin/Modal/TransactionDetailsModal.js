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
  Text,
} from '@chakra-ui/react';

export default function TransactionDetailsModal({ isOpen, onClose, transaction }) {
  if (!transaction) return null;

  const formatDateTime = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds
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
        {value !== undefined && value !== null ? value : '-'}
      </Td>
    </Tr>
  );

  const paymentDetails = transaction.paymentDetails || {};
  const billingDetails = paymentDetails.billingDetails || {};
  const shippingDetails = paymentDetails.shippingDetails || {};
  const paymentOutcome = paymentDetails.paymentOutcome || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transaction Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple" size="sm">
            <TableCaption>Detailed Information about the Transaction</TableCaption>
            <Thead>
              <Tr>
                <Th>Field</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Basic Information */}
              {renderRow("Transaction ID", transaction._id)}
              {renderRow("Created At", formatDateTime(transaction.createdAt / 1000))}
              {renderRow("Updated At", formatDateTime(transaction.updatedAt / 1000))}
              {renderRow("Event Type", paymentDetails.eventType)}
              {renderRow("Payment Intent ID", paymentDetails.paymentIntentId)}
              {renderRow("Charge ID", paymentDetails.chargeId)}
              {renderRow("Balance Transaction ID", paymentDetails.balanceTransactionId)}
              {renderRow("Description", paymentDetails.chargeDescription)}
              {renderRow("Payment Method ID", paymentDetails.paymentMethod)}
              {renderRow("Receipt Email", paymentDetails.receiptEmail ? (
                <Link href={`mailto:${paymentDetails.receiptEmail}`} color="teal.500">
                  {paymentDetails.receiptEmail}
                </Link>
              ) : '-')}
              {renderRow("Receipt URL", paymentDetails.receiptUrl ? (
                <Link href={paymentDetails.receiptUrl} color="teal.500" isExternal>
                  View Receipt
                </Link>
              ) : '-')}
              {renderRow("Request ID", paymentDetails.requestId)}
              {renderRow("Idempotency Key", paymentDetails.idempotencyKey)}

              {/* Amount Information */}
              <Tr>
                <Th colSpan={2} bg="gray.100">
                  <Text fontWeight="bold">Amount Information</Text>
                </Th>
              </Tr>
              {renderRow("Amount", paymentDetails.amount ? `$${(paymentDetails.amount / 100).toFixed(2)}` : '-')}
              {renderRow("Amount Captured", paymentDetails.amountCaptured ? `$${(paymentDetails.amountCaptured / 100).toFixed(2)}` : '-')}
              {renderRow("Currency", paymentDetails.currency ? paymentDetails.currency.toUpperCase() : '-')}
              {renderRow("Charge Status", paymentDetails.chargeStatus ? (
                paymentDetails.chargeStatus === 'succeeded' ? (
                  <Badge colorScheme="green">{paymentDetails.chargeStatus}</Badge>
                ) : (
                  <Badge colorScheme="red">{paymentDetails.chargeStatus}</Badge>
                )
              ) : '-')}

              {/* Billing Details */}
              {billingDetails && (
                <>
                  <Tr>
                    <Th colSpan={2} bg="gray.100">
                      <Text fontWeight="bold">Billing Details</Text>
                    </Th>
                  </Tr>
                  {renderRow("Name", billingDetails.name)}
                  {renderRow("Email", billingDetails.email ? (
                    <Link href={`mailto:${billingDetails.email}`} color="teal.500">
                      {billingDetails.email}
                    </Link>
                  ) : '-')}
                  {renderRow("Phone", billingDetails.phone)}
                  {renderRow("Address", billingDetails.address ? (
                    `${billingDetails.address.line1 || ''} ${billingDetails.address.line2 || ''}, ${billingDetails.address.city || ''}, ${billingDetails.address.state || ''}, ${billingDetails.address.country || ''}, ${billingDetails.address.postal_code || ''}`
                  ) : '-')}
                </>
              )}

              {/* Shipping Details */}
              {shippingDetails && (
                <>
                  <Tr>
                    <Th colSpan={2} bg="gray.100">
                      <Text fontWeight="bold">Shipping Details</Text>
                    </Th>
                  </Tr>
                  {renderRow("Name", shippingDetails.name)}
                  {renderRow("Address", shippingDetails.address ? (
                    `${shippingDetails.address.line1 || ''} ${shippingDetails.address.line2 || ''}, ${shippingDetails.address.city || ''}, ${shippingDetails.address.state || ''}, ${shippingDetails.address.country || ''}, ${shippingDetails.address.postal_code || ''}`
                  ) : '-')}
                </>
              )}

              {/* Payment Outcome */}
              {paymentOutcome && (
                <>
                  <Tr>
                    <Th colSpan={2} bg="gray.100">
                      <Text fontWeight="bold">Payment Outcome</Text>
                    </Th>
                  </Tr>
                  {renderRow("Network Status", paymentOutcome.network_status)}
                  {renderRow("Reason", paymentOutcome.reason)}
                  {renderRow("Risk Level", paymentOutcome.risk_level)}
                  {renderRow("Risk Score", paymentOutcome.risk_score)}
                  {renderRow("Seller Message", paymentOutcome.seller_message)}
                  {renderRow("Outcome Type", paymentOutcome.type)}
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
