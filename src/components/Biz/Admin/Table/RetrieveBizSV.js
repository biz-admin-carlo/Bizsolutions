import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Select,
  HStack,
  VStack,
  Box,
  Text,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  Tooltip,
  Flex,
  useToast,
  Input,
} from '@chakra-ui/react';
import { getMyVendorManagerBizNess, archiveBiz } from '../../../../utils/Biz/BizUtils.js';
import { retrieveTransactionSuccessful } from '../../../../utils/Biz/AdminUtils.js';
import GeneratePDF from './Generate/PDFFile.js';
import { FaCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle, FaHistory } from "react-icons/fa";
import { BiSolidTrash } from "react-icons/bi";
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModa.js';
import BizDetailsModal from '../Modal/BizDetailsModal.js';
import PaymentModalDetails from '../Modal/PaymentModalDetails.js';
import UserContext from '../../../../utils/Contexts/userContext.js';

export default function RetrieveBizSV() {
  const { user } = useContext(UserContext);
  const userID = user ? user._id : null;
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // **New state for package selection**
  const [selectedPackage, setSelectedPackage] = useState('all');

  // Delete Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  // Details Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Payment states
  const [paymentStatuses, setPaymentStatuses] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);

  const toast = useToast();

  const paymentData = [
    {
      package: "Starter Setup Monthly",
      price: "49.99",
    },
    {
      package: "Starter Setup Annually",
      price: "539.88",
    },
    {
      package: "Advanced Setup Monthly",
      price: "99.99",
    },
    {
      package: "Advanced Setup Annually",
      price: "1079.88",
    },
    {
      package: "Professional Revamp Monthly",
      price: "44.99",
    },
    {
      package: "Professional Revamp Annually",
      price: "399.99",
    }
  ];

  useEffect(() => {
    loadBusinesses();
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [businesses, searchText, searchDate, selectedPackage]);

  useEffect(() => {
    // Fetch payment statuses whenever filteredBusinesses change
    if (filteredBusinesses.length > 0) {
      fetchPaymentStatuses();
    }
  }, [filteredBusinesses]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  async function loadBusinesses() {
    try {
      setLoading(true);
      const bizData = await getMyVendorManagerBizNess();

      if (bizData.httpCode === '200') {
        const businessesWithAge = bizData.httpMessage.map(business => {
          const bizAge = calculateAge(business.createdAt);
          // Determine the matched package by amountTransacted
          const matchedPackage = findPackageByAmount(business.amountTransacted);

          return {
            ...business,
            bizAge,
            matchedPackage, // store the package name here
          };
        });
        setBusinesses(businessesWithAge);
        setFilteredBusinesses(businessesWithAge);
      } else {
        setError('Failed to load businesses');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }

  function findPackageByAmount(amount) {
    if (!amount) return null;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return null;

    // Match the package by comparing amounts
    // We'll assume that floating point rounding isn't a big issue,
    // but in production consider exact string matches or integers (cents).
    const matched = paymentData.find(p => parseFloat(p.price) === amountNum);
    return matched ? matched.package : null;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case false:
        return 'green.500';
      case true:
        return 'red.500';
      default:
        return 'gray.500';
    }
  };

  function calculateAge(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const ageInMilliseconds = now - createdDate;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    return ageInDays;
  }

  function formatDateTime(dateTime) {
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
  }

  function filterBusinesses() {
    let filtered = [...businesses];

    // Text search
    if (searchText.trim() !== '') {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(business =>
        (business.name && business.name.toLowerCase().includes(lowerSearchText)) ||
        (business.agent.firstName && business.agent.firstName.toLowerCase().includes(lowerSearchText)) ||
        (business.agent.lastName && business.agent.lastName.toLowerCase().includes(lowerSearchText)) ||
        (business.bizStatus && business.bizStatus.toLowerCase().includes(lowerSearchText)) ||
        (business.paymentStatus && business.paymentStatus.toLowerCase().includes(lowerSearchText)) ||
        (business.url && business.url.toLowerCase().includes(lowerSearchText)) ||
        (business.location.city && business.location.city.toLowerCase().includes(lowerSearchText)) ||
        (business.location.state && business.location.state.toLowerCase().includes(lowerSearchText)) ||
        (business.bizAge && business.bizAge.toString().includes(lowerSearchText))
      );
    }

    // Date filter
    if (searchDate !== '') {
      const searchDateFormatted = new Date(searchDate).toISOString().split('T')[0];
      filtered = filtered.filter(business => {
        const businessDate = new Date(business.createdAt).toISOString().split('T')[0];
        return businessDate === searchDateFormatted;
      });
    }

    // Package filter
    if (selectedPackage !== 'all') {
      filtered = filtered.filter(business => business.matchedPackage === selectedPackage);
    }

    setFilteredBusinesses(filtered);
    setCurrentPage(1);
  }

  const handleClearSearch = () => {
    setSearchText('');
    setSearchDate('');
    setSelectedPackage('all'); // reset package filter as well
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const openDeleteModal = (business) => {
    setBusinessToDelete(business);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBusinessToDelete(null);
  };

  const confirmDeleteBusiness = async () => {
    if (!businessToDelete) return;

    try {
      const result = await archiveBiz(businessToDelete._id);

      if (result.success) {
        setBusinesses((prevBusinesses) =>
          prevBusinesses.map((biz) =>
            biz._id === result.bizID ? { ...biz, isArchived: true } : biz
          )
        );
        setFilteredBusinesses((prevFiltered) =>
          prevFiltered.map((biz) =>
            biz._id === result.bizID ? { ...biz, isArchived: true } : biz
          )
        );

        toast({
          title: "Business Archived.",
          description: `"${businessToDelete.name}" has been successfully archived.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Archiving Failed.",
          description: result.error || "Unable to archive the business.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Unable to archive the business.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    closeDeleteModal();
  };

  const openDetailsModal = (business) => {
    setSelectedBusiness(business);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBusiness(null);
  };

  // Convert amount to cents
  function convertAmountToCents(amount) {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      return null; 
    }
    return Math.round(amountNum * 100);
  }

  async function fetchPaymentStatuses() {
    const updatedStatuses = { ...paymentStatuses };
    const updatedDetails = { ...paymentDetails };

    const statusPromises = currentBusinesses.map(async (business) => {
      updatedStatuses[business._id] = 'loading';
      setPaymentStatuses({ ...updatedStatuses });

      const amountInCents = convertAmountToCents(business.amountTransacted);

      const data = {
        name: business.alias || "",
        email: business.email || "",
        subscriptionPackage: amountInCents || "",
        createdTimeDate: business.createdAt || "",
      };

      try {
        const result = await retrieveTransactionSuccessful(data);

        updatedDetails[business._id] = result;

        if (result.result === 'successful') {
          updatedStatuses[business._id] = 'success';
        } else if (result.result === 'warning') {
          updatedStatuses[business._id] = 'warning';
        } else {
          updatedStatuses[business._id] = 'failed';
        }
      } catch (error) {
        updatedStatuses[business._id] = 'failed';
        updatedDetails[business._id] = null;
      }

      setPaymentStatuses({ ...updatedStatuses });
      setPaymentDetails({ ...updatedDetails });
    });

    await Promise.all(statusPromises);
  }

  const openPaymentModal = (business) => {
    const paymentData = paymentDetails[business._id];
    setSelectedPaymentDetails(paymentData);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPaymentDetails(null);
  };

  // Action Icons
  const renderActionIcons = (business) => {
    const actions = [
      {
        icon: GeneratePDF,
        label: "Generate PDF",
      },
      {
        icon: FaHistory,
        label: "View Payment History",
        onClick: () => {
          navigate(`/admin-dashboard/${userID}/${business._id}/see-history`);
        },
      },
    ];

    if (!business.isArchived) {
      actions.push({
        icon: BiSolidTrash,
        label: "Delete Business",
        onClick: (e) => {
          e.stopPropagation();
          openDeleteModal(business);
        }
      });
    }

    return actions;
  };

  if (loading) {
    return (
      <div className="p-4 flex flex-col items-center">
        <Spinner size="xl" />
        <Text mt={2}>Loading...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processed Accounts</h1>

      {/* Search Controls */}
      <VStack spacing={4} mb={4} align="stretch">
        <HStack spacing={4}>
          <Input
            placeholder='Search by Name, Agent, Status, Website, Location, Age'
            size='md'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Input
            placeholder='Select Date'
            size='md'
            type='date'
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </HStack>

        {/* Package Filter */}
        <HStack spacing={4}>
          <Select
            width="auto"
            size="md"
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
          >
            <option value="all">All Packages</option>
            {paymentData.map((pkg, idx) => (
              <option key={idx} value={pkg.package}>
                {pkg.package}
              </option>
            ))}
          </Select>
        </HStack>

        <HStack justify="space-between">
          <HStack spacing={4}>
            <Select 
              width="auto"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              size="sm"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </Select>

            <Text fontSize="sm">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredBusinesses.length)} of {filteredBusinesses.length} items
            </Text>
          </HStack>

          <Button
            size="sm"
            onClick={handleClearSearch}
            isDisabled={searchText === '' && searchDate === '' && selectedPackage === 'all'}
          >
            Clear Filters
          </Button>
        </HStack>
      </VStack>

      {filteredBusinesses.length === 0 && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>No businesses found matching the search criteria.</Text>
        </Alert>
      )}

      {businessToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteBusiness}
          businessName={businessToDelete.name}
        />
      )}

      {selectedBusiness && (
        <BizDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          business={selectedBusiness}
        />
      )}

      {isPaymentModalOpen && selectedPaymentDetails && (
        <PaymentModalDetails
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          paymentDetails={selectedPaymentDetails}
        />
      )}

      <TableContainer>
        <Table size="sm">
          <TableCaption>List of Processed Business Accounts</TableCaption>
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Actions</Th>
              <Th>Tracking Log</Th>
              <Th>Biz Name</Th>
              <Th>Agent Name</Th>
              <Th>Created On</Th>
              <Th>Age</Th>
              <Th>Location</Th>
              <Th>Website</Th>
              <Th>Package</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBusinesses.map((business, index) => (
              <Tr
                key={business._id}
                bg={index % 2 === 0 ? 'gray.50' : 'white'}
                cursor="pointer"
                onClick={() => openDetailsModal(business)}
                _hover={{ bg: 'gray.100' }}
              >
                <Td>
                  <Icon 
                    as={FaCircle} 
                    boxSize={3} 
                    color={getStatusColor(business.isArchived)} 
                  />
                </Td>

                {/* Payment Status Icon */}
                <Td onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
                  openPaymentModal(business);
                }}>
                  {(() => {
                    const status = paymentStatuses[business._id];

                    let icon;
                    let label;

                    if (status === 'loading') {
                      icon = <Spinner size="sm" />;
                      label = 'Loading payment status...';
                    } else if (status === 'success') {
                      icon = <Icon as={FaCheckCircle} color="green.500" />;
                      label = 'Payment Successful';
                    } else if (status === 'warning') {
                      icon = <Icon as={FaExclamationTriangle} color="yellow.500" />;
                      label = 'Subscription Package does not match';
                    } else if (status === 'failed') {
                      icon = <Icon as={FaTimesCircle} color="red.500" />;
                      label = 'Payment Failed';
                    } else {
                      icon = <Icon as={FaInfoCircle} color="gray.500" />;
                      label = 'No Payment Data';
                    }

                    return (
                      <Tooltip
                        label={label}
                        placement="top"
                        hasArrow
                        bg="gray.700"
                        color="white"
                      >
                        <span>{icon}</span>
                      </Tooltip>
                    );
                  })()}
                </Td>

                <Td onClick={(e) => e.stopPropagation()}>
                  <Flex gap={4} alignItems="center">
                    {renderActionIcons(business).map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <Tooltip
                          key={idx}
                          label={item.label}
                          placement="top"
                          hasArrow
                          bg="gray.700"
                          color="white"
                        >
                          <span>
                            {item.icon === GeneratePDF ? (
                              <GeneratePDF business={business} />
                            ) : (
                              <IconComponent
                                size={18}
                                style={{ cursor: 'pointer' }}
                                onClick={item.onClick}
                                aria-label={item.label}
                              />
                            )}
                          </span>
                        </Tooltip>
                      );
                    })}
                  </Flex>
                </Td>
                <Td>{`biz-${business._id.slice(-10)}`}</Td>
                <Td>{business.name}</Td>
                <Td>
                  {business.agent && business.agent.firstName && business.agent.lastName
                    ? `${business.agent.firstName} ${business.agent.lastName}`
                    : '-'}
                </Td>
                <Td>{formatDateTime(business.createdAt || '-')}</Td>
                <Td>{`${business.bizAge} Days` || '-'}</Td>
                <Td>{`${business.location.city || '-'}, ${business.location.state || '-'}`}</Td>
                <Td>{business.url || '-'}</Td>
                <Td>{business.matchedPackage || 'N/A'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack spacing={2} justify="center" mt={4}>
        <Button
          size="sm"
          onClick={() => handlePageChange(1)}
          isDisabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <Box>
          <Text fontSize="sm">
            Page {currentPage} of {totalPages}
          </Text>
        </Box>
        
        <Button
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
        <Button
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          isDisabled={currentPage === totalPages || totalPages === 0}
        >
          Last
        </Button>
      </HStack>
    </div>
  );
}
