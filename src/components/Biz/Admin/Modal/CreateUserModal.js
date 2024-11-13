// CreateUserModal.js

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';
import { checkToken } from '../../../../utils/Biz/UserUtils.js'; // Adjust the path accordingly

const CreateUserModal = ({ isOpen, onClose, referralCode, onUserCreated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '1234567890',
    firstName: '',
    lastName: '',
    birthday: '',
    referredBy: referralCode || '',
    role: 'Employee',
    department: 'BizSolutions',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      await checkToken(token, formData);

      toast({
        title: 'User Created',
        description: 'The new user has been successfully created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setIsSubmitting(false);
      onClose();

      if (onUserCreated) {
        onUserCreated(token, referralCode);
      }
    } catch (error) {
      toast({
        title: 'Error Creating User',
        description: error.response?.data?.message || 'An error occurred while creating the user.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Birthday</FormLabel>
              <Input
                name="birthday"
                placeholder="YYYY-MM-DD"
                value={formData.birthday}
                onChange={handleChange}
                type="date"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Referred By</FormLabel>
              <Input
                name="referredBy"
                placeholder="Referral Code"
                value={formData.referredBy}
                onChange={handleChange}
                isReadOnly={!!referralCode}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select name="role" value={formData.role} onChange={handleChange}>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Department</FormLabel>
              <Input
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText="Creating..."
              alignSelf="flex-end"
            >
              Create User
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
