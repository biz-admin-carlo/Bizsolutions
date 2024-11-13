// import React, { useContext, useEffect, useState } from 'react';
// import { Container, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Heading, Box, useColorModeValue } from '@chakra-ui/react';
// import UserContext from '../../../../utils/Contexts/userContext.js';
// import { fetchUserDetails, fetchAgentDetails } from '../../../../utils/Biz/UserUtils.js';
// import BarSpinner from '../../Shared/Spinner/BarSpinner.js';

// export default function SeeAgents() {
//   const { setUser } = useContext(UserContext);
//   const [ setUserId ] = useState('');
//   const [ isLoading, setIsLoading ] = useState(true);
//   const [ agentsDetails, setAgentsDetails ] = useState([]);
//   const [ generatedReferralCode, setGeneratedReferralCode ] = useState('');

//   const evenRowBg = useColorModeValue('gray.100', 'gray.700');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       loadUserDetails(token);
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token && generatedReferralCode) {
//       loadAgentDetails(token, generatedReferralCode);
//     }
//   }, [generatedReferralCode]);

//   const loadUserDetails = async (token) => {
//     try {
//       const data = await fetchUserDetails(token);
//       setGeneratedReferralCode(data.referralCode);
//       setUser(data);
//       setUserId(data._id);
//       setIsLoading(false);
//     } catch (error) {
//       // console.error('Error fetching user details:', error);
//       setIsLoading(false);
//     }
//   };

//   const loadAgentDetails = async (token, referralCode) => {
//     try {
//       const result = await fetchAgentDetails(token, referralCode);
//       setAgentsDetails(result.users);
//     } catch (error) {
//       // console.error('Error fetching agent details:', error);
//     }
//   };

//   if (isLoading) {
//     return <BarSpinner />;
//   }

//   return (
//     <Container maxW="container.xl" minH="85vh" p={5}>
//       <Box py={5}>
//         <Heading as="h4" size="xl" letterSpacing="wider">
//           Users
//         </Heading>
//         <Button onClick={handleCreateUserClick} mt={4}>
//           Create User
//         </Button>
//       </Box>
//       <TableContainer>
//         <Table variant="simple" size="sm">
//           <TableCaption>List of Users and Their Details</TableCaption>
//           <Thead>
//             <Tr>
//               <Th>No.</Th>
//               <Th>ID</Th>
//               <Th>Name</Th>
//               <Th>Referral Code</Th>
//               <Th>Email</Th>
//               <Th>Vendor Status</Th>
//               <Th>Active</Th>
//               <Th>Last Login</Th>
//               <Th>Referred By</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {agentsDetails.map((user, index) => (
//               <Tr key={user._id} bg={index % 2 === 0 ? evenRowBg : 'transparent'}>
//                 <Td>{index + 1}</Td>
//                 <Td>{user._id}</Td>
//                 <Td>{`${user.lastName}, ${user.firstName}`}</Td>
//                 <Td>{user.referralCode}</Td>
//                 <Td>{user.email}</Td>
//                 <Td>{user.isVendorAgent ? 'Yes' : 'No'}</Td>
//                 <Td>{user.isActive ? 'Yes' : 'No'}</Td>
//                 <Td>
//                     {user.logins.length > 0 ? 
//                         new Date(user.logins[user.logins.length - 1].loginAt).toLocaleString() : 
//                         '-'
//                     }
//                 </Td>
//                 <Td>{user.referredBy}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// }

// RetrieveAgent.js

import React, { useContext, useEffect, useState } from 'react';
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
  Flex,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import UserContext from '../../../../utils/Contexts/userContext.js';
import { fetchUserDetails, fetchAgentDetails } from '../../../../utils/Biz/UserUtils.js';
import BarSpinner from '../../Shared/Spinner/BarSpinner.js';
import CreateUserModal from '../Modal/CreateUserModal.js'; 

export default function SeeAgents() {
  const { setUser } = useContext(UserContext);
  const [setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [agentsDetails, setAgentsDetails] = useState([]);
  const [generatedReferralCode, setGeneratedReferralCode] = useState('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false); // State for modal

  const evenRowBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUserDetails(token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && generatedReferralCode) {
      loadAgentDetails(token, generatedReferralCode);
    }
  }, [generatedReferralCode]);

  const loadUserDetails = async (token) => {
    try {
      const data = await fetchUserDetails(token);
      setGeneratedReferralCode(data.referralCode);
      setUser(data);
      setUserId(data._id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const loadAgentDetails = async (token, referralCode) => {
    try {
      const result = await fetchAgentDetails(token, referralCode);
      setAgentsDetails(result.users);
    } catch (error) {
      // Handle error if needed
    }
  };

  const handleCreateUserClick = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleCloseCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  if (isLoading) {
    return <BarSpinner />;
  }

  return (
    <Container maxW="container.xl" minH="85vh" p={5}>
      <Flex py={5} alignItems="center" justifyContent="space-between">
        <Heading as="h4" size="xl" letterSpacing="wider">
          Users
        </Heading>
        <Button onClick={handleCreateUserClick}>
          Create User
        </Button>
      </Flex>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={handleCloseCreateUserModal}
        referralCode={generatedReferralCode}
        onUserCreated={loadAgentDetails} // Refresh the agent list after creation
      />

      <TableContainer>
        <Table variant="simple" size="sm">
          <TableCaption>List of Users and Their Details</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Referral Code</Th>
              <Th>Email</Th>
              <Th>Vendor Status</Th>
              <Th>Active</Th>
              <Th>Last Login</Th>
              <Th>Referred By</Th>
            </Tr>
          </Thead>
          <Tbody>
            {agentsDetails.map((user, index) => (
              <Tr key={user._id} bg={index % 2 === 0 ? evenRowBg : 'transparent'}>
                <Td>{index + 1}</Td>
                <Td>{user._id}</Td>
                <Td>{`${user.lastName}, ${user.firstName}`}</Td>
                <Td>{user.referralCode}</Td>
                <Td>{user.email}</Td>
                <Td>{user.isVendorAgent ? 'Yes' : 'No'}</Td>
                <Td>{user.isActive ? 'Yes' : 'No'}</Td>
                <Td>
                  {user.logins.length > 0
                    ? new Date(user.logins[user.logins.length - 1].loginAt).toLocaleString()
                    : '-'}
                </Td>
                <Td>{user.referredBy}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
