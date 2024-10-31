// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableContainer,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   Button,
//   Select,
//   HStack,
//   Box,
//   Text,
//   Icon
// } from '@chakra-ui/react';
// import { getMyVendorManagerBizNess } from '../../../../utils/Biz/BizUtils.js';
// import GeneratePDF from './Generate/PDFFile.js';
// import { FaCircle } from "react-icons/fa";


// export default function RetrieveBizSV() {
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Add pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   useEffect(() => {
//     loadBusinesses();
//   }, []);

//   // Pagination calculations
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentBusinesses = businesses.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(businesses.length / itemsPerPage);

//   async function loadBusinesses() {
//     try {
//       setLoading(true);
//       const bizData = await getMyVendorManagerBizNess();

//       if (bizData.httpCode === '200') {
//         const businessesWithAge = bizData.httpMessage.map(business => ({
//           ...business,
//           bizAge: calculateAge(business.createdAt),
//         }));
//         setBusinesses(businessesWithAge);
//       } else {
//         setError('Failed to load businesses');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching data');
//     } finally {
//       setLoading(false);
//     }
//   }

//   const getStatusColor = (status) => {
//     switch(status) {
//       case false:
//         return 'green.500';
//       case true:
//         return 'red.500';
//       default:
//         return 'gray.500';
//     }
//   };

//   function calculateAge(createdAt) {
//     const createdDate = new Date(createdAt);
//     const now = new Date();
//     const ageInMilliseconds = now - createdDate;
//     const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
//     return ageInDays;
//   }

//   function formatDateTime(dateTime) {
//     const date = new Date(dateTime);
//     const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true,
//     };
//     return date.toLocaleString('en-US', options);
//   }

//   // Pagination handlers
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleItemsPerPageChange = (event) => {
//     setItemsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Processed Accounts</h1>

//       {/* Pagination controls - top */}
//       <HStack spacing={4} mb={4} justify="space-between">
//         <HStack spacing={4}>
//           <Select
//             size="sm"
//             width="auto"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//           >
//             <option value={5}>5 per page</option>
//             <option value={10}>10 per page</option>
//             <option value={20}>20 per page</option>
//             <option value={50}>50 per page</option>
//           </Select>
          
//           <Text fontSize="sm">
//             Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, businesses.length)} of {businesses.length} items
//           </Text>
//         </HStack>

//         <Button colorScheme="teal" size="sm" onClick={loadBusinesses}>
//           Refresh Data
//         </Button>
//       </HStack>

//       <TableContainer>
//         <Table size="sm">
//           <TableCaption>List of Processed Business Accounts</TableCaption>
//           <Thead>
//             <Tr>
//               <Th></Th>
//               <Th>Actions</Th>
//               <Th>Tracking Log</Th>
//               <Th>Biz Name</Th>
//               <Th>Agent Name</Th>
//               <Th>Created On</Th>
//               <Th>Age</Th>
//               <Th>Biz Status</Th>
//               <Th>Payment Status</Th>
//               <Th>Location</Th>
//               <Th>Website</Th>
//               <Th>Biz Name</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {currentBusinesses.map((business, index) => (
//               <Tr key={business._id} bg={index % 2 === 0 ? 'gray.50' : 'white'}>
//                 <Td>                    
//                   <Icon 
//                     as={FaCircle} 
//                     boxSize={3} 
//                     color={getStatusColor(business.isArchived)} 
//                   />
//                 </Td>
//                 <Td>
//                   <GeneratePDF business={business} />
//                 </Td>
//                 <Td>{`biz-${business._id.slice(-10)}`}</Td>
//                 <Td>{business.name}</Td>
//                 <Td>{`${business.agent.firstName} ${business.agent.lastName}`}</Td>
//                 <Td>{formatDateTime(business.createdAt || '-')}</Td>
//                 <Td>{`${business.bizAge} Days ` || '-'}</Td>
//                 <Td>
//                   {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
//                     <em>Pending</em>
//                   ) : (
//                     <em>{business.bizStatus || '-'}</em>
//                   )}
//                 </Td>
//                 <Td>
//                   {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
//                     <em>Pending</em>
//                   ) : (
//                     <em>{business.paymentStatus || '-'}</em> 
//                   )}
//                 </Td>
//                 <Td>{`${business.location.city || '-'}, ${business.location.state || '-'}`}</Td>
//                 <Td>{business.url || '-'}</Td>
//                 <Td>{business.name}</Td>
//                 {/* <Td style={{ display: 'flex', alignItems: 'center' }}>
//                   <FaFile style={{ marginRight: '8px' }} />
//                 </Td> */}
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>

//       {/* Pagination controls - bottom */}
//       <HStack spacing={2} justify="center" mt={4}>
//         <Button
//           size="sm"
//           onClick={() => handlePageChange(1)}
//           isDisabled={currentPage === 1}
//         >
//           First
//         </Button>
//         <Button
//           size="sm"
//           onClick={() => handlePageChange(currentPage - 1)}
//           isDisabled={currentPage === 1}
//         >
//           Previous
//         </Button>
        
//         <Box>
//           <Text fontSize="sm">
//             Page {currentPage} of {totalPages}
//           </Text>
//         </Box>
        
//         <Button
//           size="sm"
//           onClick={() => handlePageChange(currentPage + 1)}
//           isDisabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//         <Button
//           size="sm"
//           onClick={() => handlePageChange(totalPages)}
//           isDisabled={currentPage === totalPages}
//         >
//           Last
//         </Button>
//       </HStack>
//     </div>
//   );
// }



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
  Select,
  HStack,
  Box,
  Text,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  Tooltip,
  Flex,
  useToast
} from '@chakra-ui/react';
import { getMyVendorManagerBizNess, archiveBiz } from '../../../../utils/Biz/BizUtils.js';
import GeneratePDF from './Generate/PDFFile.js';
import { FaCircle } from "react-icons/fa";
import { BiSolidTrash } from "react-icons/bi";
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModa.js';
import BizDetailsModal from '../Modal/BizDetailsModal.js';
import UserContext from '../../../../utils/Contexts/userContext.js';

export default function RetrieveBizSV() {
  const { user } = useContext(UserContext);
  const userID = user ? user._id : null;

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Delete Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  // Details Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const toast = useToast();

  useEffect(() => {
    loadBusinesses();
  }, []);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBusinesses = businesses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(businesses.length / itemsPerPage);

  async function loadBusinesses() {
    try {
      setLoading(true);
      const bizData = await getMyVendorManagerBizNess();

      if (bizData.httpCode === '200') {
        const businessesWithAge = bizData.httpMessage.map(business => ({
          ...business,
          bizAge: calculateAge(business.createdAt),
        }));
        setBusinesses(businessesWithAge);
      } else {
        setError('Failed to load businesses');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
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

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Delete Modal handlers
  const openDeleteModal = (business) => {
    setBusinessToDelete(business);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBusinessToDelete(null);
  };

  // Function to confirm deletion (archiving)
  const confirmDeleteBusiness = async () => {
    if (!businessToDelete) return;

    try {
      const result = await archiveBiz(businessToDelete._id);

      if (result.success) {
        // Update the business's isArchived status in the state
        setBusinesses((prevBusinesses) =>
          prevBusinesses.map((biz) =>
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
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: "Unable to archive the business.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Close the modal
    closeDeleteModal();
  };

  // Details Modal handlers
  const openDetailsModal = (business) => {
    setSelectedBusiness(business);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBusiness(null);
  };

  // Function to handle row click without triggering when clicking on action buttons
  const handleRowClick = (business) => {
    openDetailsModal(business);
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

  // Function to render action icons
  const renderActionIcons = (business) => {
    const actions = [
      {
        icon: GeneratePDF,
        label: "Generate PDF",
        // Assuming GeneratePDF is a component that handles its own click
        // If it's a function, adjust accordingly
      },
    ];

    // Conditionally add the Delete icon if the business is not archived
    if (!business.isArchived) {
      actions.push({
        icon: BiSolidTrash,
        label: "Delete Business",
        onClick: (e) => {
          e.stopPropagation(); // Prevent triggering row click
          openDeleteModal(business);
        }
      });
    }

    return actions;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processed Accounts</h1>

      {/* Pagination controls - top */}
      <HStack spacing={4} mb={4} justify="space-between">
        <HStack spacing={4}>
          <Select
            size="sm"
            width="auto"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </Select>
          
          <Text fontSize="sm">
            Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, businesses.length)} of {businesses.length} items
          </Text>
        </HStack>

        <Button colorScheme="teal" size="sm" onClick={loadBusinesses}>
          Refresh Data
        </Button>
      </HStack>

      {/* Show message when no results found */}
      {businesses.length === 0 && (
        <Alert status="info" mb={4}>
          <AlertIcon />
          <Text>No businesses found.</Text>
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

      {/* BizDetailsModal */}
      {selectedBusiness && (
        <BizDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          business={selectedBusiness}
        />
      )}

      <TableContainer>
        <Table size="sm">
          <TableCaption>List of Processed Business Accounts</TableCaption>
          <Thead>
            <Tr>
              <Th>Status</Th>
              <Th>Actions</Th>
              <Th>Tracking Log</Th>
              <Th>Biz Name</Th>
              <Th>Agent Name</Th>
              <Th>Created On</Th>
              <Th>Age</Th>
              <Th>Biz Status</Th>
              <Th>Payment Status</Th>
              <Th>Location</Th>
              <Th>Website</Th>
              <Th>Biz Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentBusinesses.map((business, index) => (
              <Tr
                key={business._id}
                bg={index % 2 === 0 ? 'gray.50' : 'white'}
                cursor="pointer"
                onClick={() => handleRowClick(business)}
                _hover={{ bg: 'gray.100' }}
              >
                <Td>                    
                  <Icon 
                    as={FaCircle} 
                    boxSize={3} 
                    color={getStatusColor(business.isArchived)} 
                  />
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
                <Td>{`${business.agent.firstName} ${business.agent.lastName}`}</Td>
                <Td>{formatDateTime(business.createdAt || '-')}</Td>
                <Td>{`${business.bizAge} Days` || '-'}</Td>
                <Td>
                  {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
                    <em>Pending</em>
                  ) : (
                    <em>{business.bizStatus || '-'}</em>
                  )}
                </Td>
                <Td>
                  {business.bizStatus === 'pending' && business.paymentStatus === 'pending' ? (
                    <em>Pending</em>
                  ) : (
                    <em>{business.paymentStatus || '-'}</em> 
                  )}
                </Td>
                <Td>{`${business.location.city || '-'}, ${business.location.state || '-'}`}</Td>
                <Td>{business.url || '-'}</Td>
                <Td>{business.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination controls - bottom */}
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
