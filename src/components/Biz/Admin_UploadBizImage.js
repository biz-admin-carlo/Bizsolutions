import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { uploadBizImage } from '../../utils/Biz/BizUtils'; 
import FeedbackModal from './Admin_FeedbackModal'; // Import the FeedbackModal component

export default function UploadImageModal({ show, handleClose, bizID, adminId }) {
    const [file, setFile] = useState(null);
    const [feedbackModalShow, setFeedbackModalShow] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const showFeedbackModal = (title, message) => {
        setFeedbackTitle(title);
        setFeedbackMessage(message);
        setFeedbackModalShow(true);
    };

    const handleUpload = async () => {
        if (!file) {
            showFeedbackModal("Upload Error", "Please select a file before uploading.");
            return;
        }

        try {
            const result = await uploadBizImage(file, adminId, bizID);
            console.log("Upload successful:", result);
            showFeedbackModal("Success", "Image uploaded successfully!");
            handleClose(); // Close the main modal after successful upload
        } catch (error) {
            console.error("Error uploading image:", error);
            showFeedbackModal("Upload Failed", "Failed to upload image. Please try again.");
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Business Image</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Select image to upload:</Form.Label>
                            <h6>This only accepts the following image types: <br/>
                            .png, .jpg, .jpeg, .gif </h6>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Button variant="primary" onClick={handleUpload}>
                    Upload Image
                </Button>
            </Modal>
            <FeedbackModal 
                show={feedbackModalShow} 
                onClose={() => setFeedbackModalShow(false)} 
                title={feedbackTitle} 
                message={feedbackMessage}
            />
        </>
    );
}
