import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VerifyModal = ({ showModal, handleModalToggle, user, selected, starterSetup, bundleSetup, transactionDate }) => {

    const formatPrice = (price) => {
        return price.toFixed(2);
    };

    const formatDateToPacificTime = (date) => {
        if (!date) return '';
        
        return date.toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    return (
        <Modal show={showModal} onHide={handleModalToggle} centered>
            <Modal.Header closeButton>
                <Modal.Title>Get! Started with {bundleSetup}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Welcome, {user.firstName} {user.lastName}!</p>
                <p>Email: {user.email}</p>
                <p>Selected Bundle: {selected === 'annual' ? 'Annually' : 'Monthly'} with price of ${formatPrice(starterSetup)}</p>
                <p>Bundle Type: {bundleSetup}</p>
                <p>Transaction Date and Time (Pacific Time): {formatDateToPacificTime(transactionDate)}</p>
                <p>Please fill in the details to get started with our {bundleSetup} package.</p>
                {/* Add forms or other content here */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalToggle}>Close</Button>
                <Button variant="warning" onClick={handleModalToggle}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VerifyModal;
