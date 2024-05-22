import React, { useState, useEffect } from 'react';
import { Container, Alert, Modal, Form } from 'react-bootstrap';
import { PiPlusBold, PiTrashFill } from "react-icons/pi";
import { BiLoaderCircle, BiCheckDouble, BiXCircle } from "react-icons/bi";
import '../assets/styles/ServiceInterface.css';
import BarSpinner from './Reusable_BarSpinner';
import { checkTeamName, createTeam, archiveTeam } from '../utils/BizUtils.js';

export default function ServiceLanding({ retrieveTeams }) {

    const [ loading, setLoading ] = useState(false);
    const [ teamData, setTeamData ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ orgName, setOrgName ] = useState('');
    const [ orgNameStatus, setOrgNameStatus ] = useState('idle');

    const toggleModal = () => setShowModal(!showModal);

    useEffect(() => {
        setTeamData(retrieveTeams);
    }, [retrieveTeams]);

    const handleArchiveTeam = async (teamId) => {
        const result = await archiveTeam(teamId);
        if (result.success) {
            alert('Team archived successfully!');
        } else {
            alert(`Failed to archive team: ${result.error}`);
        }
    };

    useEffect(() => {
        if (!orgName) {
            setOrgNameStatus('idle');
            return;
        }
        const timer = setTimeout(async () => {
            setOrgNameStatus('checking');
            try {
                const isAvailable = await checkTeamName(orgName);
                setOrgNameStatus(isAvailable ? 'available' : 'unavailable');
            } catch (error) {
                console.error('Error checking business name:', error);
                setOrgNameStatus('error');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [orgName]);

    const handleCreateTeam = async () => {
        setLoading(true);
        const result = await createTeam(orgName);
        if (result.success) {
            setOrgName('');
            setShowModal(false);
            setTeamData(prevTeams => [...prevTeams, { id: result.teamId, name: orgName }]);
        } else {
        }
        setLoading(false);
    };

    return (
        loading ? <BarSpinner /> : 
        <>        
            <div>
                <Container>
                    <div>

                        <div className='pt-5 pb-3 flex-row-align-right'>
                            <div>
                                <h1 style={{ fontSize: '2.8rem' }} className='biz-color'>My Organization</h1>
                                <h4 style={{ fontSize: '1.3rem' }} className='text-secondary'>Create team and collaborate here.</h4>
                            </div>

                            <div className='flex-row-align-right py-3'> 
                                <PiPlusBold size={40} className='biz-color clickable-icon' onClick={toggleModal}/>
                            </div>
                        </div>

                        <div>
                            {teamData.length > 0 && teamData.map(team => (
                                <Alert key={team._id} variant='light' className="d-flex justify-content-between align-items-center">
                                    <p className='box-message my-2'>{team.name}</p>
                                    <PiTrashFill size={40} className="ml-auto clickable-icon" onClick={() => handleArchiveTeam(team._id)} />
                                </Alert>
                            ))}
                        </div>

                    </div>

                    
                </Container>
            </div>

            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create an Organization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Form.Label htmlFor="organizationName" className="flex-grow-1">Organization Name</Form.Label>
                        <input
                            type="text"
                            id="organizationName"
                            className="form-control flex-grow-1"
                            placeholder="Enter organization name"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                        />
                        {orgNameStatus === 'checking' && <BiLoaderCircle className='status-icon' />}
                        {orgNameStatus === 'available' && <BiCheckDouble className='status-icon available' />}
                        {orgNameStatus === 'unavailable' && <BiXCircle className='status-icon unavailable' />}
                    </div>
                    {orgNameStatus === 'available' && (
                        <button type='button' className="custom-button my-3" onClick={handleCreateTeam}>
                            Create
                        </button>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};