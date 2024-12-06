import React, { useState, useEffect, useContext } from 'react';
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
  Spinner,
  Alert,
  Icon,
  AlertIcon,
  AlertTitle,
  Select,
  HStack,
  VStack,
  Box,
  Input,
  Text,
  Tooltip,
  Flex,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { getMyCreatedBiz, archiveBiz } from '../../../../utils/Biz/BizUtils.js';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle, FaCircle } from 'react-icons/fa';
import { retrieveTransactionSuccessful } from '../../../../utils/Biz/AdminUtils.js';
import { BiSolidImageAdd, BiSolidTrash } from 'react-icons/bi';
import ImageUploadModal from '../Modal/UploadImageModal.js';
import BizDetailsModal from '../Modal/BizDetailsModal.js';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModa.js';
import PaymentModalDetails from '../Modal/PaymentModalDetails.js';
import UserContext from '../../../../utils/Contexts/userContext.js';

export default function RetrieveBizAgent() {

  const { user } = useContext(UserContext);
  const userID = user ? user._id : null;
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const [paymentStatuses, setPaymentStatuses] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);

  const toast = useToast();

  // Search states
  const [searchTerms, setSearchTerms] = useState({
    date: '',
    businessName: '',
    city: '',
    state: '',
  });
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New states for BizDetailsModal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    loadBusinesses();
  }, []);

  // Apply filters whenever businesses or search terms change
  useEffect(() => {
    filterBusinesses();
  }, [businesses, searchTerms]);

  // Fetch payment statuses when businesses change
  useEffect(() => {
    if (businesses.length > 0) {
      fetchPaymentStatuses();
    }
  }, [businesses]);

  // Pagination calculations based on filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  // Function to open the delete confirmation modal
  const openDeleteModal = (business) => {
    setBusinessToDelete(business);
    setIsDeleteModalOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBusinessToDelete(null);
  };

  // Function to confirm deletion (archiving)
  const confirmDeleteBusiness = async () => {
    if (!businessToDelete) return;

    const result = await archiveBiz(businessToDelete._id);

    if (result.success) {
      // Update the business's isArchived status in the state
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

      // Show success toast
      toast({
        title: "Business Archived.",
        description: `"${businessToDelete.name}" has been successfully archived.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Show error toast
      toast({
        title: "Archiving Failed.",
        description: result.error || "Unable to archive the business.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Close the modal
    closeDeleteModal();
  };

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

  // Format date for comparison
  function formatDateForComparison(date) {
    return new Date(date).toISOString().split('T')[0];
  }

  // Filter businesses based on all search criteria
  function filterBusinesses() {
    let filtered = [...businesses];

    // Date filter
    if (searchTerms.date) {
      const searchDateFormatted = formatDateForComparison(searchTerms.date);
      filtered = filtered.filter(business => {
        const businessDate = formatDateForComparison(business.createdAt);
        return businessDate === searchDateFormatted;
      });
    }

    // Business name filter
    if (searchTerms.businessName) {
      const searchName = searchTerms.businessName.toLowerCase();
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchName)
      );
    }

    // City filter
    if (searchTerms.city) {
      const searchCity = searchTerms.city.toLowerCase();
      filtered = filtered.filter(business =>
        business.location.city.toLowerCase().includes(searchCity)
      );
    }

    // State filter
    if (searchTerms.state) {
      const searchState = searchTerms.state.toLowerCase();
      filtered = filtered.filter(business =>
        business.location.state.toLowerCase().includes(searchState)
      );
    }

    setFilteredBusinesses(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }

  async function loadBusinesses() {
    try {
      setLoading(true);
      const { httpCode, httpMessage } = await getMyCreatedBiz();
      if (httpCode === '200') {
        const businessesWithAge = httpMessage.map(business => ({
          ...business,
          bizAge: calculateAge(business.createdAt),
        }));
        setBusinesses(businessesWithAge);
        setFilteredBusinesses(businessesWithAge);
      } else {
        setError('Failed to load businesses.');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }

  function calculateAge(createdAt) {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const ageInMilliseconds = now - createdDate;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    return ageInDays;
  }

  // Handle search term changes
  const handleSearchChange = (field, value) => {
    setSearchTerms(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Clear all searches
  const handleClearSearch = () => {
    setSearchTerms({
      date: '',
      businessName: '',
      city: '',
      state: '',
    });
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Modal handlers
  const openModal = (business) => {
    setCurrentBusiness(business);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBusiness(null);
  };

  // Handlers for BizDetailsModal
  const openDetailsModal = (business) => {
    setSelectedBusiness(business);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBusiness(null);
  };

  // Handlers for PaymentModalDetails
  const openPaymentModal = (business) => {
    const paymentData = paymentDetails[business._id];
    setSelectedPaymentDetails(paymentData);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPaymentDetails(null);
  };

  // Callback after successful upload to refresh data
  const handleUploadSuccess = () => {
    loadBusinesses();
  };

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
      // Set initial status to 'loading'
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

        updatedDetails[business._id] = result; // Store the payment details

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

  const icons = (business) => {
    const iconsArray = [
      {
        icon: BiSolidImageAdd,
        label: "Add Biz Images",
        onClick: (e) => {
          e.stopPropagation(); // Prevent triggering row click
          openModal(business);
        } // Open modal with business object
      },
    ];
  
    // Conditionally add the Delete icon if the business is not archived
    if (!business.isArchived) {
      iconsArray.push({
        icon: BiSolidTrash,
        label: "Delete Biz",
        onClick: (e) => {
          e.stopPropagation();
          openDeleteModal(business);
        }
      });
    }
  
    return iconsArray;
  };  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processed Accounts</h1>
      
      {/* Search controls */}
      <VStack spacing={4} mb={4} align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <Input
            placeholder='Select Date'
            size='md'
            type='date'
            value={searchTerms.date}
            onChange={(e) => handleSearchChange('date', e.target.value)}
          />
          <Input
            placeholder='Search Business Name'
            size='md'
            value={searchTerms.businessName}
            onChange={(e) => handleSearchChange('businessName', e.target.value)}
          />
          <Input
            placeholder='Search City'
            size='md'
            value={searchTerms.city}
            onChange={(e) => handleSearchChange('city', e.target.value)}
          />
          <Input
            placeholder='Search State'
            size='md'
            value={searchTerms.state}
            onChange={(e) => handleSearchChange('state', e.target.value)}
          />
        </SimpleGrid>

        <HStack justify="space-between">
          <HStack spacing={4}>
            <Select 
              width="auto"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </Select>

            <Text>
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredBusinesses.length)} of {filteredBusinesses.length} items
            </Text>
          </HStack>

          <Button
            size="sm"
            onClick={handleClearSearch}
            isDisabled={!Object.values(searchTerms).some(term => term !== '')}
          >
            Clear Filters
          </Button>
        </HStack>
      </VStack>

      {/* Show message when no results found */}
      {filteredBusinesses.length === 0 && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>No businesses found matching the search criteria.</Text>
        </Alert>
      )}

      {/* Delete Confirmation Modal */}
      {businessToDelete && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteBusiness}
          businessName={businessToDelete.name}
        />
      )}

      {/* ImageUploadModal */}
      {currentBusiness && (
        <ImageUploadModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          business={currentBusiness} 
          userID={userID} 
          onUploadSuccess={handleUploadSuccess} 
        />
      )}

      {/* BizDetailsModal */}
      {selectedBusiness && (
        <BizDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          business={selectedBusiness}
        />
      )}

      {/* PaymentModalDetails */}
      {isPaymentModalOpen && selectedPaymentDetails && (
        <PaymentModalDetails
          isOpen={isPaymentModalOpen}
          onClose={closePaymentModal}
          paymentDetails={selectedPaymentDetails}
        />
      )}

      {/* Business Table */}
      <TableContainer>
        <Table size="sm">
          <TableCaption>List of Processed Business Accounts</TableCaption>
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Payment</Th>
              <Th>Action</Th>
              <Th>Tracking Log</Th>
              <Th>Biz Name</Th>
              <Th>Created On</Th>
              <Th>Age</Th>
              <Th>Biz</Th>
              <Th>Location</Th>
              <Th>Category</Th>
              <Th>Website</Th>
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
                <Td textAlign="center" onClick={(e) => e.stopPropagation()}>
                  <Tooltip
                    label={
                      business.isArchived
                        ? 'Business is Archived'
                        : business.isPending
                        ? 'Business is Pending'
                        : 'Business is Active'
                    }
                    placement="top"
                    hasArrow
                    bg="gray.700"
                    color="white"
                  >
                    <span>
                      <Icon 
                        as={FaCircle} 
                        boxSize={3} 
                        color={
                          business.isArchived
                            ? 'red.500'
                            : business.isPending
                            ? 'yellow.500'
                            : 'green.500'
                        } 
                      />
                    </span>
                  </Tooltip>
                </Td>
                <Td textAlign="center" onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the row click
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
                      label = 'Contact Administrator';
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
                    {icons(business).map((item, idx) => {
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
                            <IconComponent
                              size={18}
                              style={{ cursor: 'pointer' }}
                              onClick={item.onClick}
                              aria-label={item.label}
                            />
                          </span>
                        </Tooltip>
                      );
                    })}
                  </Flex>
                </Td>
                <Td>{`biz-${business._id.slice(-10)}`}</Td>
                <Td>{business.name}</Td>            
                <Td>{formatDateTime(business.createdAt)}</Td>
                <Td>{`${business.bizAge} Days` || '-'}</Td>
                <Td>
                  {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
                    <em>Pending</em>
                  ) : (
                    <em>{business.bizStatus || '-'}</em>
                  )}
                </Td>
                <Td>{`${business.location.city}, ${business.location.state}`}</Td>
                <Td>{business.categories[0]?.title || '-'}</Td>
                <Td>{business.url || '-'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
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
          Page {currentPage} of {totalPages}
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

      {/* Refresh button */}
      <div className="mt-4">
        <Button colorScheme="teal" onClick={loadBusinesses}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
}
