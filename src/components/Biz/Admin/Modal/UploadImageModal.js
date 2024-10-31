// ImageUploadModal.js

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
    HStack,
    Text,
    Box,
    useToast,
    Progress,
    Icon,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Code
} from '@chakra-ui/react';
import { BiCloudUpload, BiX } from 'react-icons/bi';
import { uploadBizImage } from '../../../../utils/Biz/BizUtils.js'; // Adjust the path accordingly

const ImageUploadModal = ({ isOpen, onClose, business, userID, onUploadSuccess }) => {
    // State to hold the selected file
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const toast = useToast();

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (!file) return; // If no file is selected, do nothing

        // Validate file type
        const isValid = file.type.startsWith('image/');
        // Validate file size (<=5MB)
        const isUnderSize = file.size <= 5 * 1024 * 1024; 

        // If invalid file type, show error toast
        if (!isValid) {
            toast({
                title: "Invalid File Type",
                description: `${file.name} is not an image file.`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // If file size exceeds limit, show error toast
        if (!isUnderSize) {
            toast({
                title: "File Too Large",
                description: `${file.name} exceeds the 5MB limit.`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // If valid, set the selected file
        setSelectedFile(file);
    };

    // Remove the selected file
    const removeFile = () => {
        setSelectedFile(null);
    };

    // Handle the upload process
    const handleUpload = async () => {
        if (!selectedFile) {
            toast({
                title: "No File Selected",
                description: "Please select an image to upload.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!userID) {
            toast({
                title: "User ID Missing",
                description: "Unable to upload images without a valid user ID.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            // Upload the single file
            await uploadBizImage(selectedFile, userID, business._id, business.name);
            setUploadProgress(100);

            toast({
                title: "Upload Successful",
                description: `${selectedFile.name} has been uploaded successfully.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Clear the selected file and close the modal
            setSelectedFile(null);
            onClose();

            // Invoke the callback to inform the parent component
            if (onUploadSuccess) {
                onUploadSuccess();
            }

        } catch (error) {
            toast({
                title: "Upload Failed",
                description: error.response?.data?.message || error.message || "Failed to upload image.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Upload Image for {business ? `biz-${business._id.slice(-10)}` : '...'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing={4} align="stretch">
                        {/* Warning Alert */}
                        <Alert status="warning" borderRadius="md">
                            <AlertIcon />
                            <Box>
                                <AlertTitle>Proper Naming Convention Required</AlertTitle>
                                <AlertDescription>
                                    Please ensure your image filenames follow the format:
                                    <br />
                                    <Code colorScheme="red">biz-name-image-1</Code>, 
                                    <Code colorScheme="red">biz-name-image-2</Code>, etc.
                                </AlertDescription>
                            </Box>
                        </Alert>

                        {/* Upload Area */}
                        <Box
                            border="2px dashed"
                            borderColor="gray.300"
                            borderRadius="md"
                            p={4}
                            textAlign="center"
                            position="relative"
                            _hover={{ borderColor: 'blue.500' }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                            <Icon as={BiCloudUpload} w={8} h={8} color="gray.500" />
                            <Text mt={2}>Drag and drop an image here or click to browse</Text>
                            <Text fontSize="sm" color="gray.500">
                                Maximum file size: 5MB
                            </Text>
                        </Box>

                        {/* Selected File Preview */}
                        {selectedFile && (
                            <VStack spacing={2} align="stretch">
                                <Text fontWeight="bold">Selected File:</Text>
                                <HStack justify="space-between" p={2} bg="gray.50" borderRadius="md">
                                    <Text isTruncated maxW="200px">{selectedFile.name}</Text>
                                    <Button
                                        size="sm"
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={removeFile}
                                        leftIcon={<BiX />}
                                        aria-label="Remove selected file"
                                    >
                                        Remove
                                    </Button>
                                </HStack>
                            </VStack>
                        )}

                        {/* Upload Progress */}
                        {uploading && (
                            <Progress 
                                value={uploadProgress} 
                                size="sm" 
                                colorScheme="blue" 
                                borderRadius="md"
                            />
                        )}

                        {/* Upload Button */}
                        <Button
                            colorScheme="blue"
                            onClick={handleUpload}
                            isLoading={uploading}
                            loadingText="Uploading..."
                            disabled={!selectedFile || uploading}
                            alignSelf="flex-end"
                        >
                            Upload Image
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );

};

export default ImageUploadModal;
