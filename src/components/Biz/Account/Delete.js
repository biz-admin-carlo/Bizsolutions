import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import Axios from 'axios';
import BarSpinner from '../Shared/Spinner/BarSpinner';

const apiUrl = process.env.REACT_APP_API_URL;

export default function DeleteAccount({ user }) {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ successfulDelete, setSuccessfulDelete ] = useState(false)

    const token = localStorage.getItem('token');

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const confirmDelete = async () => {
        handleCloseModal();
        setIsLoading(true);
    
        try {
            const response = await Axios.delete(`${apiUrl}/api/v1/users/delete-account/${user._id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
                setSuccessfulDelete(true);
    
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };


  if (isLoading) {
    return <BarSpinner />;
  }

return (
    <Container style={{ minHeight: '90vh' }} className="pb-5">

        <div className='my-3'>
            <h2>Delete Account</h2>
        </div>

        <div>
            <hr />
            <p className='text-secondary pb-3' style={{ fontSize: '13px' }}>Please note that deleting your account is irreversible and will result in the permanent loss of all your data and settings. If you decide later that you wish to reactivate your account, you will need to start from scratch. For reactivation requests or if you change your mind after deletion, please contact us at <span style={{ color: '#FF851A' }}>sales@bizsolutions.com</span>. We're here to assist you. Think carefully before proceeding with account deletion, as this action cannot be undone and all your stored information will be permanently removed.</p>
        </div>

        <div className='py-3'>
            <Button variant="outline-secondary" style={{ width: '100%' }} onClick={handleShowModal}>
                I want to delete this account
            </Button>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Body>
                Are you sure you want to delete your account? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button variant="warning" onClick={confirmDelete}>
                    Delete Account
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Success Modal */}
        <Modal show={successfulDelete} onHide={handleLogout} centered>
            <Modal.Body>
                Your account has been successfully deleted.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleLogout}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>

    </Container>
  );
};