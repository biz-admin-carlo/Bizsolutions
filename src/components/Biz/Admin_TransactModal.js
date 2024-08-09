import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTransaction } from '../../utils/Biz/AdminUtils.js';

import SuccessBox from './Biz_Success.js';
import FailBox from './Biz_Failure.js';

export default function TransactModal({ show, handleClose, bizID, adminId }) {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ agentName, setAgentName ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ service, setService ] = useState('');
    const [ adminToken, setAdminToken ] = useState(''); 
    const [ serviceValue, setServiceValue ] = useState('');
    const [ resultStatus, setResultStatus ] = useState('pending');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAdminToken(token)
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);

    useEffect(() => {
        const serviceValues = {
            'Web Development Starter Annually': 539.88,
            'Web Development Starter Monthly': 49.99,
            'Web Development Advanced Annually': 1079.88,
            'Web Development Advanced Monthly': 99.99,
            'Web Development Expert': 1.00,
            'Web Development Trial': 5.99,
            'Web Revamp Professional Annually': 399.99,
            'Web Revamp Professional Monthly': 49.99,
            'Web Revamp Enterprise': 1.00,
        };

        setServiceValue(serviceValues[service] || '');
    }, [service]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
    };

    const handleConfirm = async () => {
        const result = await addTransaction(adminToken, bizID, email, status, service, serviceValue, agentName);
        if (result) {
            setResultStatus('success');
            setEmail('');
            setAgentName('');
            setStatus('');
            setService('');
            setServiceValue('');
            setTimeout(() => setResultStatus('pending'), 5000);
        } else {
            setResultStatus('failure');
            setTimeout(() => setResultStatus('pending'), 5000);
        }
        handleClose();
    };

    const isFormComplete = email && status && service && agentName;

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Transact Biz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
    
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted pt-lg-3">
                                Contact Person's Email Address
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicStatus">
                            <Form.Label>Status</Form.Label>
                            {['Active', 'Closed', 'Cancelled', 'Declined'].map((stat, index) => (
                                <Form.Check 
                                    key={stat} 
                                    type="radio" 
                                    label={stat} 
                                    value={stat} 
                                    id={`status-${index}`}
                                    name="status"
                                    checked={status === stat}
                                    onChange={handleStatusChange}
                                    htmlFor={`status-${index}`}
                                />
                            ))}
                        </Form.Group>
                        <hr />
                        <Form.Group controlId="formBasicService">

                            <Form.Label className="mt-3"><strong>Web Development</strong></Form.Label>
                            {['Web Development Starter Annually', 'Web Development Starter Monthly', 'Web Development Advanced Annually', 'Web Development Advanced Monthly', 'Web Development Expert', 'Web Development Trial'].map((serv, index) => (
                                <Form.Check 
                                    key={serv} 
                                    type="radio" 
                                    label={serv} 
                                    value={serv} 
                                    id={`service-dev-${index}`}
                                    name="service"
                                    checked={service === serv}
                                    onChange={handleServiceChange}
                                />
                            ))}

                            <Form.Label className="mt-3"><strong>Web Revamp</strong></Form.Label>
                            {['Web Revamp Professional Annually', 'Web Revamp Professional Monthly', 'Web Revamp Enterprise'].map((serv, index) => (
                                <Form.Check 
                                    key={serv} 
                                    type="radio" 
                                    label={serv} 
                                    value={serv} 
                                    id={`service-revamp-${index}`}
                                    name="service"
                                    checked={service === serv}
                                    onChange={handleServiceChange}
                                />
                            ))}
                        </Form.Group>

                        <hr />

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Agent Name</Form.Label>
    
                            <Form.Control 
                                type="text" 
                                placeholder="Enter agent name" 
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="success" 
                        onClick={handleConfirm}
                        disabled={!isFormComplete}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {resultStatus === 'success' && <div data-aos="fade-down"><SuccessBox /></div>}
            {resultStatus === 'failure' && <div data-aos="fade-down"><FailBox /></div>} 
        </>
    );
};

