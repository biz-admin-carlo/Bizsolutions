import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Box,
  useColorModeValue,
  Input,
  IconButton,
  Select,
  Flex,
  Spacer,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react';
import { retrieveAllCustomers } from '../../../../utils/Biz/AdminUtils.js';
import BarSpinner from '../../Shared/Spinner/BarSpinner.js';
import {
  CheckCircleIcon,
  WarningIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpDownIcon,
} from '@chakra-ui/icons';
import TransactionDetailsModal from '../Modal/TransactionDetailsModal.js';

export default function CustomerTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ count: 0, customers: [] });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination, Search, Sorting, and Filtering State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageOptions = [10, 25, 50, 100];
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  });
  const [filterPlan, setFilterPlan] = useState('All Plans');

  const evenRowBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const responseData = await retrieveAllCustomers();
      if (responseData) {
        setData({
          count: responseData.count || 0,
          customers: responseData.customers || [],
        });
      } else {
        setData({ count: 0, customers: [] });
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setData({ count: 0, customers: [] });
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  // Plan Name Mapping Function
  const planAmounts = {
    4999: 'Starter Setup Monthly',
    53988: 'Starter Setup Annually',
    9999: 'Advanced Setup Monthly',
    107988: 'Advanced Setup Annually',
    4499: 'Professional Revamp Monthly',
    39999: 'Professional Revamp Annually',
  };

  const getPlanName = (amount) => planAmounts[amount] || 'Unknown Plan';

  // Get unique plan names for filter options
  const planOptions = ['All Plans', ...new Set(Object.values(planAmounts))];

  // Helper function to convert strings to title case
  const toTitleCase = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle Search Input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle Sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle Filter Change
  const handleFilterChange = (event) => {
    setFilterPlan(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Filter Data Based on Search Query and Filter Plan
  const filteredCustomers = data.customers.filter((customer) => {
    const query = searchQuery.toLowerCase();
    const planName = getPlanName(customer.paymentDetails?.amount);
    const customerNameRaw = customer.paymentDetails?.billingDetails?.name || '';
    const customerName = toTitleCase(customerNameRaw);

    const matchesSearch =
      customerName.toLowerCase().includes(query) ||
      (customer.paymentDetails?.receiptEmail?.toLowerCase().includes(query) ||
        '') ||
      (customer.paymentDetails?.chargeStatus?.toLowerCase().includes(query) ||
        '') ||
      (customer.paymentDetails?.currency?.toLowerCase().includes(query) || '') ||
      (customer.paymentDetails?.amount?.toString().includes(query) || '') ||
      planName.toLowerCase().includes(query);

    const matchesFilter =
      filterPlan === 'All Plans' || planName === filterPlan;

    return matchesSearch && matchesFilter;
  });

  // Sort the Filtered Data
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    const key = sortConfig.key;
    let aValue = a;
    let bValue = b;

    if (key === 'plan') {
      aValue = getPlanName(a.paymentDetails?.amount);
      bValue = getPlanName(b.paymentDetails?.amount);
    } else if (key === 'customerName') {
      const aNameRaw = a.paymentDetails?.billingDetails?.name || '';
      const bNameRaw = b.paymentDetails?.billingDetails?.name || '';
      aValue = toTitleCase(aNameRaw);
      bValue = toTitleCase(bNameRaw);
    } else {
      // Handle nested keys
      key.split('.').forEach((k) => {
        aValue = aValue ? aValue[k] : '';
        bValue = bValue ? bValue[k] : '';
      });
    }

    if (aValue === undefined || aValue === null) aValue = '';
    if (bValue === undefined || bValue === null) bValue = '';

    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination Logic
  const totalItems = sortedCustomers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <>
      <Container maxW="container.xl" minH="85vh" p={5}>
        <Box py={5}>
          <Heading as="h4" size="xl" letterSpacing="wider">
            Customers ({data.count})
          </Heading>
        </Box>

        {/* Search, Filter, and Items Per Page Controls */}
        <Flex mb={4} alignItems="center" wrap="wrap">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            width="300px"
            mr={4}
            mb={2}
          />
          <Select
            width="250px"
            value={filterPlan}
            onChange={handleFilterChange}
            mr={4}
            mb={2}
          >
            {planOptions.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </Select>
          <Select
            width="120px"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            mr={4}
            mb={2}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </Select>
          <Spacer />
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
        </Flex>

        {/* Table */}
        <TableContainer>
          <Table variant="simple" size="sm">
            <TableCaption>
              Showing {paginatedCustomers.length} of {totalItems} results
            </TableCaption>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>
                  <Flex align="center">
                    Customer Name
                    <IconButton
                      icon={<ArrowUpDownIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => handleSort('customerName')}
                      variant="ghost"
                      aria-label="Sort"
                    />
                  </Flex>
                </Th>
                <Th>
                  <Flex align="center">
                    Created At
                    <IconButton
                      icon={<ArrowUpDownIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => handleSort('createdAt')}
                      variant="ghost"
                      aria-label="Sort"
                    />
                  </Flex>
                </Th>
                <Th>
                  <Flex align="center">
                    Amount
                    <IconButton
                      icon={<ArrowUpDownIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => handleSort('paymentDetails.amount')}
                      variant="ghost"
                      aria-label="Sort"
                    />
                  </Flex>
                </Th>
                <Th>
                  <Flex align="center">
                    Currency
                    <IconButton
                      icon={<ArrowUpDownIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => handleSort('paymentDetails.currency')}
                      variant="ghost"
                      aria-label="Sort"
                    />
                  </Flex>
                </Th>
                <Th>
                  <Flex align="center">
                    Plan
                    <IconButton
                      icon={<ArrowUpDownIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => handleSort('plan')}
                      variant="ghost"
                      aria-label="Sort"
                    />
                  </Flex>
                </Th>
                <Th>Charge Status</Th>
                <Th>Receipt URL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedCustomers.map((customer, index) => {
                const transactionNumber =
                  (currentPage - 1) * itemsPerPage + index + 1;
                const planName = getPlanName(customer.paymentDetails?.amount);
                const customerNameRaw =
                  customer.paymentDetails?.billingDetails?.name || '-';
                const customerName = toTitleCase(customerNameRaw);

                return (
                  <Tr
                    key={customer._id}
                    bg={index % 2 === 0 ? evenRowBg : 'transparent'}
                    _hover={{ bg: evenRowBg }}
                    cursor="pointer"
                    onClick={() => openModal(customer)}
                  >
                    <Td>{transactionNumber}</Td>
                    <Td>{customerName}</Td>
                    <Td>
                      {new Date(customer.createdAt).toLocaleString('en-US', {
                        timeZone: 'UTC',
                      })}
                    </Td>
                    <Td>
                      {customer.paymentDetails?.amount
                        ? `$${(customer.paymentDetails.amount / 100).toFixed(2)}`
                        : '-'}
                    </Td>
                    <Td>
                      {customer.paymentDetails?.currency?.toUpperCase() || '-'}
                    </Td>
                    <Td>{planName}</Td>
                    <Td>
                      {customer.paymentDetails?.chargeStatus === 'succeeded' ? (
                        <CheckCircleIcon color="green.500" />
                      ) : (
                        <WarningIcon color="red.500" />
                      )}
                    </Td>
                    <Td
                      onClick={(e) => e.stopPropagation()} // Prevent row click event
                    >
                      {customer.paymentDetails?.receiptUrl ? (
                        <a
                          href={customer.paymentDetails.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Receipt
                        </a>
                      ) : (
                        '-'
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Flex justify="center" mt={4}>
          <ButtonGroup>
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              aria-label="Previous Page"
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                variant={currentPage === i + 1 ? 'solid' : 'outline'}
              >
                {i + 1}
              </Button>
            ))}
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              aria-label="Next Page"
            />
          </ButtonGroup>
        </Flex>
      </Container>

      {/* Include the TransactionDetailsModal */}
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={selectedTransaction}
      />
    </>
  );
}
